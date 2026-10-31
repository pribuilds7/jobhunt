import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PasswordField from '../ui/PasswordField';
import FormBanner from '../ui/FormBanner';
import StatusMessage from '../ui/StatusMessage';
import { passwordChangeSchema } from '../../lib/schemas';
import { useAuthStore } from '../../store/authStore';

function usePasswordForm(setMessage) {
  const changePassword = useAuthStore((state) => state.changePassword);
  const form = useForm({ resolver: zodResolver(passwordChangeSchema), defaultValues: { current: '', next: '' } });
  const onSubmit = async (values) => {
    try {
      await changePassword(values);
      form.reset();
      setMessage('Password updated.');
    } catch (error) {
      form.setError('root', { message: error.message });
    }
  };
  return { form, onSubmit };
}

export default function PasswordForm() {
  const [message, setMessage] = useState('');
  const { form, onSubmit } = usePasswordForm(setMessage);
  const { register, handleSubmit, formState: { errors } } = form;
  return (
    <form className="form-stack" onSubmit={handleSubmit(onSubmit)} noValidate>
      <PasswordField id="current-password" label="Current password" autoComplete="current-password" error={errors.current?.message} {...register('current')} />
      <PasswordField id="new-password" label="New password" autoComplete="new-password" error={errors.next?.message} {...register('next')} />
      <FormBanner message={errors.root?.message} />
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">Change password</button>
        <StatusMessage message={message} />
      </div>
    </form>
  );
}
