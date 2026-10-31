import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import AuthLayout from '../../components/auth/AuthLayout';
import AuthHeading from '../../components/auth/AuthHeading';
import SignupVisual from '../../components/auth/SignupVisual';
import GoogleButton from '../../components/auth/GoogleButton';
import OrDivider from '../../components/auth/OrDivider';
import StrengthMeter from '../../components/auth/StrengthMeter';
import TextField from '../../components/ui/TextField';
import PasswordField from '../../components/ui/PasswordField';
import Checkbox from '../../components/ui/Checkbox';
import FormBanner from '../../components/ui/FormBanner';
import SubmitButton from '../../components/ui/SubmitButton';
import { signupSchema } from '../../lib/schemas';
import { useAuthStore } from '../../store/authStore';

const GOOGLE_MESSAGE = "Google sign-up isn't connected yet. Please use your email for now.";
const DEFAULTS = { name: '', email: '', password: '', targetRole: '', terms: false };

function useSignupForm() {
  const signUp = useAuthStore((state) => state.signUp);
  const form = useForm({ resolver: zodResolver(signupSchema), defaultValues: DEFAULTS });
  const onSubmit = async (values) => {
    try {
      await signUp(values);
    } catch (error) {
      form.setError('root', { message: error.message });
    }
  };
  return { form, onSubmit };
}

export default function Signup() {
  const { form, onSubmit } = useSignupForm();
  const { register, handleSubmit, setError, watch, formState: { errors, isSubmitting } } = form;
  return (
    <AuthLayout headline="Your job hunt, organised." visual={<SignupVisual />}>
      <AuthHeading title="Create your account" subtitle="Free for personal use." />
      <GoogleButton onClick={() => setError('root', { message: GOOGLE_MESSAGE })} />
      <OrDivider />
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField id="name" label="Full name" autoComplete="name" error={errors.name?.message} {...register('name')} />
        <TextField id="email" label="Email" type="email" autoComplete="email" error={errors.email?.message} {...register('email')} />
        <PasswordField id="password" label="Password" autoComplete="new-password" error={errors.password?.message} {...register('password')} />
        <StrengthMeter password={watch('password')} />
        <TextField id="targetRole" label="What roles are you targeting? (optional)" placeholder="e.g. Product Designer" {...register('targetRole')} />
        <Checkbox id="terms" error={errors.terms?.message} {...register('terms')}>
          I agree to the <a href="/terms" className="text-link">Terms</a> and <a href="/privacy" className="text-link">Privacy Policy</a>
        </Checkbox>
        <FormBanner message={errors.root?.message} />
        <SubmitButton loading={isSubmitting}>Create account</SubmitButton>
      </form>
      <p className="auth-footer">Already have an account? <Link to="/login" className="text-link strong">Log in</Link></p>
    </AuthLayout>
  );
}
