import React from 'react';
import Context from '../../context/Context';

const UserNotPermit = () => {
    const {user} = React.useContext(Context);
    return (
        <>
            <div className="texto-inicial" style={{marginTop: '150px'}}>voce não possui acesso a esse recurso, apenas o SuperAdmin possui esse acesso.
            </div>
        </>
    )
    }  
    export default UserNotPermit;
