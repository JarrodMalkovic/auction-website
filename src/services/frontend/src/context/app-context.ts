import { createContext } from 'react';

const AppContext = createContext({
  auth: { isAuthenticated: false, currentUser: null },
  setAuth: (auth: any) => {},
});

export default AppContext;
