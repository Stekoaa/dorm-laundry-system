import { Link } from 'react-router-dom';
import React from 'react';

export const Lounge: React.FC = () => {
    return (
        <section>
            <h1>The Lounge</h1>
            <br />
            <p>Admins and Editors can hang out here.</p>
            <div className='flexGrow'>
                <Link to='/'>Home</Link>
            </div>
        </section>
    );
};
