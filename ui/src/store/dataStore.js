import { create } from 'zustand';
import { readJson, removeJson, writeJson } from '../lib/storage';
import { nowIso, todayIso } from '../lib/dates';
import { sampleApplications } from '../lib/sampleData';
import { addEvent, applyEdit, buildApplication, changeStatus } from './applicationUpdates';
import { removeById, updateById, upsert } from './listUpdates';

const EMPTY = { userId: null, profile: null, applications: [], contacts: [], documents: [] };

function dataKey(userId) {
  return `hunt.data.${userId}`;
}

function pickData(state) {
  const { profile, applications = [], contacts = [], documents = [] } = state;
  return { profile, applications, contacts, documents };
}

function withCreatedAt(doc) {
  if (doc.id) return doc;
  return { ...doc, createdAt: todayIso() };
}

export const useDataStore = create((set, get) => {
  function commit(patch) {
    set(patch);
    writeJson(dataKey(get().userId), pickData(get()));
  }

  function editApplication(id, update) {
    const touch = (application) => ({ ...update(application), updatedAt: nowIso() });
    commit({ applications: updateById(get().applications, id, touch) });
  }

  return {
    ...EMPTY,
    load: (userId) => set({ ...EMPTY, ...readJson(dataKey(userId), {}), userId }),
    clear: () => set(EMPTY),
    createProfile: (userId, profile) => {
      set({ ...EMPTY, userId });
      commit({ profile: { weeklyGoal: 10, ...profile } });
    },
    updateProfile: (patch) => commit({ profile: { ...get().profile, ...patch } }),
    addApplication: (values) => commit({ applications: [buildApplication(values), ...get().applications] }),
    updateApplication: (id, values) => editApplication(id, (app) => applyEdit(app, values)),
    moveApplication: (id, status) => editApplication(id, (app) => changeStatus(app, status)),
    addTimelineEvent: (id, event) => editApplication(id, (app) => addEvent(app, event)),
    deleteApplication: (id) => commit({ applications: removeById(get().applications, id) }),
    saveContact: (contact) => commit({ contacts: upsert(get().contacts, contact) }),
    deleteContact: (id) => commit({ contacts: removeById(get().contacts, id) }),
    saveDocument: (doc) => commit({ documents: upsert(get().documents, withCreatedAt(doc)) }),
    deleteDocument: (id) => commit({ documents: removeById(get().documents, id) }),
    loadSampleData: () => commit({ applications: [...sampleApplications(), ...get().applications] }),
    importData: (data) => commit({ ...pickData(data), profile: data.profile ?? get().profile }),
    exportData: () => pickData(get()),
    removeAll: () => {
      removeJson(dataKey(get().userId));
      set(EMPTY);
    },
  };
});
