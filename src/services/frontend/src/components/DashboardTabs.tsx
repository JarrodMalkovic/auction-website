import Tab from './Tab';
import Tabs from './Tabs';

const DashboardTabs = () => {
    return (
        <Tabs>
            <Tab link='/dashboard/listings' name='All Listings' />
            <Tab link='/dashboard/sold' name='Sold Listings' />
            <Tab link='/dashboard/expired' name='Expired Listings' />
            <Tab link='/dashboard/bids' name='Your Bids' />
        </Tabs>
    );
};

export default DashboardTabs;
