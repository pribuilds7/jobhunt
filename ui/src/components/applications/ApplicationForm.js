import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ActionFields, BasicsFields, DetailsFields, LinkFields, StatusFields } from './FormFields';
import { applicationSchema } from '../../lib/schemas';
import { toOptions } from '../../lib/options';
import { toFormValues } from './formValues';
import { useDataStore } from '../../store/dataStore';

function useLinkOptions() {
  const contacts = useDataStore((state) => state.contacts);
  const documents = useDataStore((state) => state.documents);
  const resumes = documents.filter((doc) => doc.kind === 'resume');
  return { contactOptions: toOptions(contacts, 'name'), resumeOptions: toOptions(resumes, 'name') };
}

function useSaveApplication(application, onSaved) {
  const addApplication = useDataStore((state) => state.addApplication);
  const updateApplication = useDataStore((state) => state.updateApplication);
  return (values) => {
    if (application) updateApplication(application.id, values);
    else addApplication(values);
    onSaved();
  };
}

export default function ApplicationForm({ application, hidden, onSaved, onInvalid }) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({ resolver: zodResolver(applicationSchema), defaultValues: toFormValues(application) });
  const save = useSaveApplication(application, onSaved);
  const linkOptions = useLinkOptions();
  return (
    <form id="application-form" className="form-stack" hidden={hidden} onSubmit={handleSubmit(save, onInvalid)} noValidate>
      <BasicsFields register={register} errors={errors} />
      <StatusFields register={register} isClosed={watch('status') === 'closed'} />
      <DetailsFields register={register} />
      <LinkFields register={register} {...linkOptions} />
      <ActionFields register={register} />
    </form>
  );
}
