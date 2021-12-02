import React, { useState, useContext, useEffect } from 'react';
import Context from './Context';
import useStorage from './../../utils/useStorage';

const AuthContext = React.createContext();
export function useAuth(){
    return useContext(AuthContext);
}

const Provider = ({children}) => {
    const [user, setUser] = useState({
        name: '',
    });
    const [token, setToken] = useStorage('token');

    useEffect(() => {
        const userStorage = localStorage.getItem("user");
        if(userStorage){
            setUser(JSON.parse(userStorage));
        }else {
            setUser({
                name: '',
            });
        }
    }, [])


    return(
        <Context.Provider value={{token, user, setToken, setUser}}>
            {children}
        </Context.Provider>
    )
}

export default Provider;