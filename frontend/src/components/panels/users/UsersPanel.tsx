import React from "react";

import {useUsersPanel} from "./useUsersPanel";
import {Panel} from "../Panel";

export const UsersPanel: React.FC = () => {
    const { columns, fetchFunction, dataConverter, filterFunction, filterComponent, idDeleted, idUpdated } = useUsersPanel();

    return (
        <Panel
            fetchFunction={fetchFunction}
            columns={columns}
            title='Reservations'
            dataConverter={dataConverter}
            pagination={true}
            filterFunction={filterFunction}
            subHeaderComponent={filterComponent}
            deletedId={idDeleted}
            updatedId={idUpdated}
        />
    );

};

