import React, { useContext } from 'react';
import { AuthContext, AuthContextType } from "../../../context";
import { useReservationsPanel } from "./useReservationsPanel";
import { ROLES } from "../../../Roles";
import { Panel } from "./Panel";

export const ReservationsPanel: React.FC = () => {
    const { user } = useContext<AuthContextType>(AuthContext);
    const isAdmin = user?.roles.map(role => role.authority).includes(ROLES.ADMIN);
    const { columns, fetchFunction, dataConverter, filterFun, filterComponent, idDeleted } = useReservationsPanel(!!isAdmin);

    return (
        <Panel
            fetchFunction={fetchFunction}
            columns={columns}
            title='Reservations'
            dataConverter={dataConverter}
            pagination={true}
            filterFunction={filterFun}
            subHeaderComponent={filterComponent}
            deletedId={idDeleted}
        />
    );
};
