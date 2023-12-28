import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import React, { useContext } from 'react';
import { AuthContext } from '../../context';
import { ROLES } from '../../Roles';

export const Navbar: React.FC = () => {
    const { user, handleLogout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        handleLogout();
        navigate('/login');
    };

    const userLinks = [
        ['/', 'Home'],
        ['/reservations', 'Reservations'],
        ['/myReservations', 'My reservations']
    ];
    const adminLinks = [
        ['/dupa', 'Dupa'],
        ['/reservations', 'Reservations'],
        ['/myReservations', 'Reservations']
    ];
    
    const isAdmin = user?.roles.map(role => role.authority).includes(ROLES.ADMIN);
    const links = isAdmin ? adminLinks : userLinks;

    const createNavLink = (link: string, linkText: string, className: string = 'NavLink') => {
        return (
            <NavLink to={link} className={className}>
                { linkText }
            </NavLink>
        );
    };

    return (
        <>
            <nav className='Nav'>
                <div className='NavMenu'>
                    {links.map(([link, linkText]) => createNavLink(link, linkText))}
                </div>
                <div className='NavBtn'>
                    <button className='NavBtnLink' onClick={handleLogoutClick}> Log out</button>
                </div>
            </nav>
        </>
    );
};
