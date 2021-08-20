import { createContext } from 'react';

const AuthContext = createContext({
  profile: null,
  token: null
});

export default AuthContext;