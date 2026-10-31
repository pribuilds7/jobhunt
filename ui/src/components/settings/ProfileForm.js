import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import TextField from '../ui/TextField';
import StatusMessage from '../ui/StatusMessage';
import { profileSchema } from '../../lib/schemas';
import { useDataStore } from '../../store/dataStore';

function profileDefaults(profile) {
  return { name: profile?.name ?? '', targetRole: profile?.targetRole ?? '', weeklyGoal: profile?.weeklyGoal ?? 10 };
}

export default function ProfileForm() {
  const profile = useDataStore((state) => state.profile);
  const updateProfile = useDataStore((state) => state.updateProfile);
  const [message, setMessage] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(profileSchema), defaultValues: profileDefaults(profile) });
  const onSubmit = (values) => {
    updateProfile(values);
    setMessage('Profile saved.');
  };
  return (
    <form className="form-stack" onSubmit={handleSubmit(onSubmit)} noValidate>
      <TextField id="profile-name" label="Name" error={errors.name?.message} {...register('name')} />
      <TextField id="profile-role" label="Target role" {...register('targetRole')} />
      <TextField id="profile-goal" label="Weekly goal (applications)" type="number" min={1} max={100} error={errors.weeklyGoal?.message} {...register('weeklyGoal')} />
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">Save profile</button>
        <StatusMessage message={message} />
      </div>
    </form>
  );
}
