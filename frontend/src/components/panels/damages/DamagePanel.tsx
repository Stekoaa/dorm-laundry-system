import React from "react";
import {Panel} from "../Panel";
import {useDamagePanel} from "./useDamagePanel";

export const DamagePanel: React.FC = () => {
    const { columns, fetchFunction, dataConverter, updatedId } = useDamagePanel();

    return (
        <Panel
            fetchFunction={fetchFunction}
            columns={columns}
            title={'Damages'}
            dataConverter={dataConverter}
            pagination={true}
            updatedId={updatedId}
            />
    );
};