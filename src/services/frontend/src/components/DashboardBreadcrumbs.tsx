import Breadcrumb from './Breadcrumb';
import Breadcrumbs from './Breadcrumbs';

interface IProps {
  link: string;
  name: string;
}

const DashboardBreadcrumbs = ({ link, name }: IProps) => {
  return (
    <Breadcrumbs>
      <Breadcrumb link="/" name="Home" />
      <Breadcrumb link="/dashbord" name="Dashboard" />
      <Breadcrumb link={link} name={name} />
    </Breadcrumbs>
  );
};

export default DashboardBreadcrumbs;
