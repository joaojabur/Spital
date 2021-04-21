import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import DataContext from '../../context/DataContext';


export default function PrivateRoute({ component: Component, ...rest}: any) {
    const { redirect } = useContext(DataContext);

    return (
        redirect ?  
            <Route {...rest} render={props => {<Component {...props} />}}/> 
            : <Redirect to="/"/>
    )
}