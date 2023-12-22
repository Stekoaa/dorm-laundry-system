import React from 'react';
import './App.css';
import { LoginForm, RegistrationForm } from './components';
import { Route, Routes } from 'react-router-dom';
import {
    Home,
    Layout,
    Lounge,
    PageNotFound,
    RequireAuth,
    Unauthorized
} from './components';
import {ROLES} from './Roles';

function App() {
    return (
        <Routes>
            <Route path='/' element={ <Layout/> }>
                <Route path='login' element={ <LoginForm/> }/>
                <Route path='register' element={ <RegistrationForm/> }/>
                <Route path='unauthorized' element={ <Unauthorized/> }/>

                <Route element={<RequireAuth allowedRoles={[ROLES.USER]}/>}>
                    <Route path='/' element={ <Home/> }/>
                </Route>

                {/*<Route element={<RequireAuth allowedRoles={[ROLES.Editor]}/>}>*/}
                {/*    <Route path='editor' element={<Editor/>}/>*/}
                {/*</Route>*/}


                {/*<Route element={<RequireAuth allowedRoles={[ROLES.Admin]}/>}>*/}
                {/*    <Route path='admin' element={<Admin/>}/>*/}
                {/*</Route>*/}

                <Route element={<RequireAuth allowedRoles={[ROLES.USER]}/>}>
                    <Route path='lounge' element={ <Lounge/> }/>
                </Route>

                {/* catch all */}
                <Route path='*' element={<PageNotFound/>}/>
            </Route>
        </Routes>
    );
}

export default App;
