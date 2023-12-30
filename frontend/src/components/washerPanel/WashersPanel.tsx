import React from 'react';
import { useWashersPanel } from "./useWashersPanel";
import { Panel } from "./booking/Panel";
import { getWashers, WasherDto } from "../../api";

export const WashersPanel: React.FC = () => {
    const {columns, conditionalRowStyles, updatedId } = useWashersPanel();
    const converter = (items: WasherDto[]) => items;

    return (
        <Panel
            fetchFunction={getWashers}
            columns={columns}
            title='Washers'
            pagination={false}
            conditionalRowStyles={conditionalRowStyles}
            dataConverter={converter}
            updatedId={updatedId}
        />
    );
};
