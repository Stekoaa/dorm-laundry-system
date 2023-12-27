import React from 'react';
import './App.css';
import {Home, LoginForm, RegistrationForm } from './components';
import { Route, Routes } from 'react-router-dom';
import {
    //Home,
    Layout,
    Lounge,
    PageNotFound,
    RequireAuth,
    Unauthorized
} from './components';
import { ROLES } from './Roles';
import {ReservationWasherPanel} from "./components/washerPanel/ReservationWasherPanel";
import {BookingPanel} from "./components/booking/BookingPanel";

const App = () => {
    return (
        <Routes>
            <Route path='/' element={ <Layout/> }>
                <Route path='login' element={ <LoginForm/> }/>
                <Route path='register' element={ <RegistrationForm/> }/>
                <Route path='unauthorized' element={ <Unauthorized/> }/>

                <Route element={<RequireAuth allowedRoles={[ROLES.USER, ROLES.ADMIN]}/>}>
                    <Route path='/' element={ <Home/> }/>
                </Route>

                <Route element={<RequireAuth allowedRoles={[ROLES.USER]}/>}>
                    <Route path='lounge' element={ <Lounge/> }/>
                    <Route path='reservations' element={ <ReservationWasherPanel/> }/>
                    <Route path='book/*' element={ <BookingPanel/>}/>
                </Route>

                {/* catch all */}
                <Route path='*' element={<PageNotFound/>}/>
            </Route>
        </Routes>
    );
};

export default App;
