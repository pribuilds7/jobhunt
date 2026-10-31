import { create } from 'zustand';
import { clearSession, readJson, readSession, writeJson, writeSession } from '../lib/storage';
import { hashPassword } from '../lib/password';
import { newId } from '../lib/ids';
import { signupRequest } from '../lib/authApi';
import { useDataStore } from './dataStore';

const USERS_KEY = 'hunt.users';
const SESSION_KEY = 'hunt.session';

function readUsers() {
  return readJson(USERS_KEY, []);
}

function findUser(match) {
  const users = readUsers();
  return users.find(match);
}

function findByEmail(email) {
  const normalized = email.trim().toLowerCase();
  return findUser((user) => user.email === normalized);
}

function saveUser(updated) {
  const others = readUsers().filter((user) => user.id !== updated.id && user.email !== updated.email);
  writeJson(USERS_KEY, [...others, updated]);
}

async function buildUser(id, { email, password }) {
  const passwordHash = await hashPassword(password);
  return { id, email: email.trim().toLowerCase(), passwordHash };
}

async function checkPassword(user, password) {
  const hash = await hashPassword(password);
  return Boolean(user) && user.passwordHash === hash;
}

function initialUser() {
  const user = readSession(SESSION_KEY);
  if (user) useDataStore.getState().load(user.id);
  return user;
}

export const useAuthStore = create((set, get) => {
  function startSession(user, remember) {
    const sessionUser = { id: user.id, email: user.email };
    writeSession(SESSION_KEY, sessionUser, remember);
    useDataStore.getState().load(user.id);
    set({ user: sessionUser });
  }

  function currentRecord() {
    return findUser((user) => user.id === get().user.id);
  }

  return {
    user: initialUser(),

    signUp: async (values) => {
      const created = await signupRequest(values);
      const user = await buildUser(created.id ?? newId(), values);
      saveUser(user);
      useDataStore.getState().createProfile(user.id, { name: values.name, targetRole: values.targetRole });
      startSession(user, true);
    },

    logIn: async ({ email, password, remember }) => {
      const user = findByEmail(email);
      const valid = await checkPassword(user, password);
      if (!valid) throw new Error("That email and password don't match.");
      startSession(user, remember);
    },

    logOut: () => {
      clearSession(SESSION_KEY);
      useDataStore.getState().clear();
      set({ user: null });
    },

    sendResetLink: async () => {
      await new Promise((resolve) => setTimeout(resolve, 600));
    },

    changePassword: async ({ current, next }) => {
      const user = currentRecord();
      const valid = await checkPassword(user, current);
      if (!valid) throw new Error('Your current password is incorrect.');
      saveUser({ ...user, passwordHash: await hashPassword(next) });
    },

    deleteAccount: () => {
      const remaining = readUsers().filter((user) => user.id !== get().user.id);
      writeJson(USERS_KEY, remaining);
      useDataStore.getState().removeAll();
      get().logOut();
    },
  };
});
