import Breadcrumb from './Breadcrumb';
import Breadcrumbs from './Breadcrumbs';

interface IProps {
    link: string;
    name: string;
}

const SettingsBreadcrumbs = ({ link, name }: IProps) => {
    return (
        <Breadcrumbs>
            <Breadcrumb link='/' name='Home' />
            <Breadcrumb link='/settings' name='Settings' />
            <Breadcrumb link={link} name={name} />
        </Breadcrumbs>
    );
};

export default SettingsBreadcrumbs;
