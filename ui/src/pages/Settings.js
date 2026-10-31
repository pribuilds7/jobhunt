import PageHeader from '../components/ui/PageHeader';
import Panel from '../components/ui/Panel';
import ProfileForm from '../components/settings/ProfileForm';
import PasswordForm from '../components/settings/PasswordForm';
import DataSection from '../components/settings/DataSection';
import DangerSection from '../components/settings/DangerSection';

export default function Settings() {
  return (
    <>
      <PageHeader title="Settings" subtitle="Profile, password and your data." />
      <div className="settings-grid">
        <Panel title="Profile"><ProfileForm /></Panel>
        <Panel title="Change password"><PasswordForm /></Panel>
        <Panel title="Your data"><DataSection /></Panel>
        <Panel title="Delete account"><DangerSection /></Panel>
      </div>
    </>
  );
}
