import { FunctionComponent } from 'react';

import Tab from './Tab';
import Tabs from './Tabs';

const SettingsTabs: FunctionComponent = () => {
  return (
    <Tabs>
      <Tab link="/settings/profile" name="Profile" />
      <Tab link="/settings/security" name="Security and Privacy" />
    </Tabs>
  );
};

export default SettingsTabs;
