import { useNavigate, Link } from 'react-router-dom';
import React, { useContext } from 'react';
import AuthContext from '../../context/AuthProvider';

export const Home: React.FC = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/linkpage');
    };

    return (
        <section>
            <h1>Home</h1>
            <br />
            <p>You are logged in!</p>
            <br />
            <Link to='/editor'>Go to the Editor page</Link>
            <br />
            <Link to='/admin'>Go to the Admin page</Link>
            <br />
            <Link to='/lounge'>Go to the Lounge</Link>
            <br />
            <Link to='/linkpage'>Go to the link page</Link>
            <div className='flexGrow'>
                <button onClick={handleLogout}>Sign Out</button>
            </div>
        </section>
    );
};
