import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import TextField from '../ui/TextField';
import SelectField from '../ui/SelectField';
import FormActions from '../ui/FormActions';
import { documentSchema } from '../../lib/schemas';
import { DOCUMENT_KINDS } from '../../lib/status';

const EMPTY = { name: '', kind: 'resume', note: '' };

export default function DocumentForm({ doc, onSave, onCancel }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: zodResolver(documentSchema), defaultValues: doc ?? EMPTY });
  const onSubmit = (values) => {
    onSave({ ...values, id: doc?.id });
    reset(EMPTY);
  };
  return (
    <form className="form-stack" onSubmit={handleSubmit(onSubmit)} noValidate>
      <TextField id="doc-name" label="Name *" placeholder="e.g. Resume — Product v3" error={errors.name?.message} {...register('name')} />
      <SelectField id="doc-kind" label="Type" options={DOCUMENT_KINDS} {...register('kind')} />
      <TextField id="doc-note" label="Note" placeholder="What makes this version different?" {...register('note')} />
      <FormActions isEditing={Boolean(doc)} onCancel={onCancel} />
    </form>
  );
}
