import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import TextField from '../ui/TextField';
import SelectField from '../ui/SelectField';
import { eventSchema } from '../../lib/schemas';
import { EVENT_TYPES } from '../../lib/status';
import { todayIso } from '../../lib/dates';
import { useDataStore } from '../../store/dataStore';

const defaults = () => ({ type: 'interview', at: todayIso(), text: '' });

export default function EventForm({ applicationId }) {
  const addTimelineEvent = useDataStore((state) => state.addTimelineEvent);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: zodResolver(eventSchema), defaultValues: defaults() });
  const onSubmit = (values) => {
    addTimelineEvent(applicationId, values);
    reset(defaults());
  };
  return (
    <form className="event-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="form-grid">
        <SelectField id="event-type" label="Type" options={EVENT_TYPES} {...register('type')} />
        <TextField id="event-date" label="Date" type="date" error={errors.at?.message} {...register('at')} />
      </div>
      <TextField id="event-text" label="What happened?" placeholder="e.g. Round 2 with hiring manager" error={errors.text?.message} {...register('text')} />
      <button type="submit" className="btn btn-secondary">Add to timeline</button>
    </form>
  );
}
