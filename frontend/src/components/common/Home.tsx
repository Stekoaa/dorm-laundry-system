import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { AuthContext } from "../../context";

export const Home: React.FC = () => {
    const { user } = useContext(AuthContext);

    return (
        <section>
            <h1>Hello {user?.firstName}!</h1>
            <br />
            <Link to='/editor'>Go to the Editor page</Link>
            <br />
            <Link to='/admin'>Go to the Admin page</Link>
        </section>
    );
};
