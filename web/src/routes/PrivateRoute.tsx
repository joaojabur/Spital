import React from 'react'
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import ConfirmEmail from '../pages/ConfirmEmail';

export default function PrivateRoute({ component: Component, ...rest}: any) {
    const { authenticated, confirmed } = useAuth();

    if (authenticated){
        console.log(confirmed);
        return <Route {...rest} render={
            props => confirmed ? <Component {...props}/> : <ConfirmEmail/>
        }/>
    }
    
    return (
        <Redirect to="/"/>
    );
}