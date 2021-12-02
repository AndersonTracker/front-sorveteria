import { createContext } from "react";

const Context = createContext({
    token: 'false',
    setToken: () => {},
    user: '',
    setUser: () => {}
});

export default Context;