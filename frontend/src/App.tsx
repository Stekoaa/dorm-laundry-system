import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import {
    Home,
    Layout,
    PageNotFound,
    RequireAuth,
    Unauthorized,
    LoginForm,
    RegistrationForm,
    WashersPanel,
    BookingPanel
} from './components';
import { ROLES } from './Roles';
import {ReservationsPanel} from "./components/washerPanel/booking/ReservationsPanel";

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

                <Route element={<RequireAuth allowedRoles={[ROLES.USER, ROLES.ADMIN]}/>}>
                    <Route path='reservations' element={ <WashersPanel/> }/>
                    <Route path='myReservations' element={<ReservationsPanel/>}/>
                    <Route path='book/*' element={ <BookingPanel/>}/>
                </Route>

                <Route path='*' element={<PageNotFound/>}/>
            </Route>
        </Routes>
    );
};

export default App;
