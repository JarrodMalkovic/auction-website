import { useRouter } from 'next/router';

const Settings = () => {
  const router = useRouter();

  // Make sure we're in the browser
  if (typeof window !== 'undefined') {
    router.push('/settings/profile');
  }

  return <h1>Redirecting..</h1>;
};

export default Settings;
