import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import xw from 'xwind/macro';

import SearchIcon from './SearchIcon';

const StyledSearchBar = styled.div(xw`
    flex-1 
    flex
    items-center 
    justify-center 
    lg:ml-6 
    lg:justify-end 
`);

const StyledLabel = styled.label(xw`
    sr-only    
`);

const StyledSearchContent = styled.div(xw`
    max-w-lg 
    w-full 
    lg:max-w-xs 
    relative
`);

const StyledInput = styled.input(xw`
    block 
    w-full 
    pl-10 
    pr-3 
    py-2 
    border 
    border-gray-300 
    rounded-md 
    leading-5 
    bg-white 
    placeholder-gray-500 
    focus:outline-none 
    focus:placeholder-gray-400 
    focus:ring-1 
    focus:ring-indigo-500 
    focus:border-indigo-500 
    sm:text-sm
`);

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push({
      pathname: `/listings`,
      query: { search },
    });

    setSearch('');
  };

  return (
    <StyledSearchBar>
      <StyledSearchContent>
        <StyledLabel htmlFor="search">Search</StyledLabel>
        <form onSubmit={onSubmit}>
          <SearchIcon />
          <StyledInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            id="search"
            name="search"
            placeholder="Search listings"
            type="text"
          />
        </form>
      </StyledSearchContent>
    </StyledSearchBar>
  );
};

export default SearchBar;
