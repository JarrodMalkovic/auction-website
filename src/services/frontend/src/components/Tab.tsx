import ActiveLink from './ActiveLink';

interface IProps {
  link: string;
  name: string;
}

const Tab = ({ link, name }: IProps) => {
  return (
    <ActiveLink
      activeClassName="border-indigo-500 text-indigo-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
      href={link}
    >
      <a className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
        {name}
      </a>
    </ActiveLink>
  );
};

export default Tab;
