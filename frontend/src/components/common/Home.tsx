import React, { useContext } from 'react';
import { AuthContext } from "../../context";

export const Home: React.FC = () => {
    const { user } = useContext(AuthContext);

    return (
        <section>
            <h1>Hello {user?.firstName}!</h1>
        </section>
    );
};
