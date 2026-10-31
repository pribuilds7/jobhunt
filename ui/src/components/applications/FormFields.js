import TextField from '../ui/TextField';
import TextArea from '../ui/TextArea';
import SelectField from '../ui/SelectField';
import { CLOSED_REASONS, SOURCES, STATUSES, WORK_MODES } from '../../lib/status';

export function BasicsFields({ register, errors }) {
  return (
    <>
      <TextField id="app-company" label="Company *" error={errors.company?.message} {...register('company')} />
      <TextField id="app-role" label="Role *" error={errors.role?.message} {...register('role')} />
      <TextField id="app-url" label="Job URL" type="url" placeholder="https://" error={errors.url?.message} {...register('url')} />
    </>
  );
}

export function DetailsFields({ register }) {
  return (
    <div className="form-grid">
      <TextField id="app-location" label="Location" {...register('location')} />
      <SelectField id="app-mode" label="Work mode" placeholder="Not set" options={WORK_MODES} {...register('workMode')} />
      <TextField id="app-salary" label="Salary range" placeholder="e.g. $90–110k" {...register('salary')} />
      <SelectField id="app-source" label="Source" placeholder="Not set" options={SOURCES} {...register('source')} />
    </div>
  );
}

export function StatusFields({ register, isClosed }) {
  return (
    <div className="form-grid">
      <SelectField id="app-status" label="Status" options={STATUSES} {...register('status')} />
      <TextField id="app-applied" label="Date applied" type="date" {...register('appliedAt')} />
      {isClosed && <SelectField id="app-closed" label="Closed reason" placeholder="Not set" options={CLOSED_REASONS} {...register('closedReason')} />}
    </div>
  );
}

export function LinkFields({ register, contactOptions, resumeOptions }) {
  return (
    <div className="form-grid">
      <SelectField id="app-contact" label="Contact person" placeholder="None" options={contactOptions} {...register('contactId')} />
      <SelectField id="app-resume" label="Resume version used" placeholder="None" options={resumeOptions} {...register('resumeVersion')} />
    </div>
  );
}

export function ActionFields({ register }) {
  return (
    <>
      <div className="form-grid">
        <TextField id="app-next" label="Next action" placeholder="e.g. Follow up" {...register('nextAction')} />
        <TextField id="app-due" label="Due date" type="date" {...register('nextActionDue')} />
      </div>
      <TextArea id="app-notes" label="Notes" {...register('notes')} />
    </>
  );
}
