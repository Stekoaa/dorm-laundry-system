import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import React, { useContext } from 'react';
import { AuthContext } from '../../context';
import { ROLES } from '../../Roles';
import {LinkButton} from "./LinkButton";

export const Navbar: React.FC = () => {
    const { user, handleLogout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        handleLogout();
        navigate('/login');
    };

    const handleBookClick = () => navigate('/washers');

    const userLinks = [
        ['/', 'Home'],
        ['/myReservations', 'My Reservations']
    ];
    const adminLinks = [
        ['/', 'Home'],
        ['/washers', 'Washers Panel'],
        ['/reservations', 'Reservations']
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
                    {!isAdmin && (
                        <LinkButton
                            onClick={handleBookClick}
                            text='Book washer'
                            className='NavBtnBook'
                        />
                    )
                    }
                </div>
                <LinkButton
                    onClick={handleLogoutClick}
                    text='Log out'
                    className='NavBtnLogout'
                />
            </nav>
        </>
    );
};
