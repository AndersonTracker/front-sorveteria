import React from 'react';
import Context from '../context/Context';

const LogadoComo = () => {
    const {user} = React.useContext(Context);
        return (
            <>
                <div className='logadoComoPosition'>
                    {user.name.length > 0 ? (
                        <span className='logadoComo' >logado como: <span id='locadoComoEu'>{user.name}</span></span>
                    ): <span className='logadoComo' >voce não esta logado.</span>}
                </div>
            </>
        );
    }  
    export default LogadoComo;
