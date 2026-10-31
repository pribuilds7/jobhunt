import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import AuthLayout from '../../components/auth/AuthLayout';
import AuthHeading from '../../components/auth/AuthHeading';
import TextField from '../../components/ui/TextField';
import SubmitButton from '../../components/ui/SubmitButton';
import { forgotSchema } from '../../lib/schemas';
import { useAuthStore } from '../../store/authStore';

function SentMessage({ email }) {
  return (
    <div className="auth-success" role="status">
      <AuthHeading title="Check your inbox" subtitle={`If an account exists for ${email}, a reset link is on its way.`} />
      <Link to="/login" className="btn btn-ghost btn-lg btn-block">Back to log in</Link>
    </div>
  );
}

function ResetForm({ onSent }) {
  const sendResetLink = useAuthStore((state) => state.sendResetLink);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(forgotSchema), defaultValues: { email: '' } });
  const onSubmit = async ({ email }) => {
    await sendResetLink(email);
    onSent(email);
  };
  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <TextField id="email" label="Email" type="email" autoComplete="email" error={errors.email?.message} {...register('email')} />
      <SubmitButton loading={isSubmitting}>Send reset link</SubmitButton>
    </form>
  );
}

export default function ForgotPassword() {
  const [sentTo, setSentTo] = useState('');
  return (
    <AuthLayout headline="Let's get you back in.">
      {sentTo && <SentMessage email={sentTo} />}
      {!sentTo && <AuthHeading title="Reset your password" subtitle="Enter your email and we'll send you a reset link." />}
      {!sentTo && <ResetForm onSent={setSentTo} />}
      {!sentTo && <p className="auth-footer">Remembered it? <Link to="/login" className="text-link strong">Log in</Link></p>}
    </AuthLayout>
  );
}
