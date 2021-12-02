import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router';
import Context from './../context/Context';
var valor = 'false';

const RoutePrivate = ({ component: Component, ...rest}) => {
    var {token} = useContext(Context);
    valor = token;
        return(
        <Route
        {...rest}
        render={() => valor === 'true' 
            ? <Component {...rest}/>
            : <Redirect to="/LoginPage"/>
        }
        />
    )
}
export default RoutePrivate;