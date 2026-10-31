import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import TextField from '../ui/TextField';
import TextArea from '../ui/TextArea';
import FormActions from '../ui/FormActions';
import { contactSchema } from '../../lib/schemas';

const EMPTY = { name: '', company: '', email: '', linkedin: '', notes: '' };

export default function ContactForm({ contact, onSave, onCancel }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: zodResolver(contactSchema), defaultValues: { ...EMPTY, ...contact } });
  const onSubmit = (values) => {
    onSave({ ...values, id: contact?.id });
    reset(EMPTY);
  };
  return (
    <form className="form-stack" onSubmit={handleSubmit(onSubmit)} noValidate>
      <TextField id="contact-name" label="Name *" error={errors.name?.message} {...register('name')} />
      <TextField id="contact-company" label="Company" {...register('company')} />
      <TextField id="contact-email" label="Email" type="email" error={errors.email?.message} {...register('email')} />
      <TextField id="contact-linkedin" label="LinkedIn URL" type="url" placeholder="https://" error={errors.linkedin?.message} {...register('linkedin')} />
      <TextArea id="contact-notes" label="Notes" {...register('notes')} />
      <FormActions isEditing={Boolean(contact)} onCancel={onCancel} />
    </form>
  );
}
