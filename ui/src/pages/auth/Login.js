import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import AuthLayout from '../../components/auth/AuthLayout';
import AuthHeading from '../../components/auth/AuthHeading';
import LoginVisual from '../../components/auth/LoginVisual';
import GoogleButton from '../../components/auth/GoogleButton';
import OrDivider from '../../components/auth/OrDivider';
import TextField from '../../components/ui/TextField';
import PasswordField from '../../components/ui/PasswordField';
import Checkbox from '../../components/ui/Checkbox';
import FormBanner from '../../components/ui/FormBanner';
import SubmitButton from '../../components/ui/SubmitButton';
import { loginSchema } from '../../lib/schemas';
import { useAuthStore } from '../../store/authStore';

const GOOGLE_MESSAGE = "Google sign-in isn't connected yet. Please use your email for now.";

function ForgotLink() {
  return <Link to="/forgot-password" className="text-link small">Forgot password?</Link>;
}

function useLoginForm() {
  const logIn = useAuthStore((state) => state.logIn);
  const form = useForm({ resolver: zodResolver(loginSchema), defaultValues: { email: '', password: '', remember: true } });
  const onSubmit = async (values) => {
    try {
      await logIn(values);
    } catch (error) {
      form.setError('root', { message: error.message });
    }
  };
  return { form, onSubmit };
}

export default function Login() {
  const { form, onSubmit } = useLoginForm();
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = form;
  return (
    <AuthLayout headline="Every application, one calm place." copy="Track roles from first interest to final offer without the spreadsheet." visual={<LoginVisual />}>
      <AuthHeading title="Welcome back" subtitle="Log in to pick up where you left off." />
      <GoogleButton onClick={() => setError('root', { message: GOOGLE_MESSAGE })} />
      <OrDivider />
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField id="email" label="Email" type="email" autoComplete="email" error={errors.email?.message} {...register('email')} />
        <PasswordField id="password" label="Password" autoComplete="current-password" aside={<ForgotLink />} error={errors.password?.message} {...register('password')} />
        <Checkbox id="remember" {...register('remember')}>Keep me logged in</Checkbox>
        <FormBanner message={errors.root?.message} />
        <SubmitButton loading={isSubmitting}>Log in</SubmitButton>
      </form>
      <p className="auth-footer">New to Hunt? <Link to="/signup" className="text-link strong">Create an account</Link></p>
    </AuthLayout>
  );
}
