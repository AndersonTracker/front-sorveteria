import React from 'react';
import Context from '../context/Context';

const Logout = () => {
    const {setUser} = React.useContext(Context);
    const {setToken} = React.useContext(Context);
    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser({
            name: "",
        });
        setToken({
            token: false,
        });
    };
        return (
            <>
                <div className='btnLogout'>
                    <button onClick={handleLogout} type="button" className='btnLogin'>faça Logout</button>
                </div>
            </>
        );
    }  
    export default Logout;