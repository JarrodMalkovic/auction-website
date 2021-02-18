import { useRouter } from 'next/router';

const Dashboard = () => {
	const router = useRouter();

	// Make sure we're in the browser
	if (typeof window !== 'undefined') {
		router.push('/dashboard/listings');
	}

	return <h1>Redirecting..</h1>;
};

export default Dashboard;
