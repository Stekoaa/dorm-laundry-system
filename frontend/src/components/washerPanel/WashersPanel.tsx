import React from 'react';
import { useWashersPanel } from "./useWashersPanel";
import { Panel } from "./booking/Panel";
import { getWashers, WasherDto } from "../../api";

export const WashersPanel: React.FC = () => {
    const {columns, conditionalRowStyles} = useWashersPanel();
    const converter = (items: WasherDto[]) => {
        return items;
    };

    return (
        <Panel<WasherDto, WasherDto>
            fetchFunction={getWashers}
            columns={columns}
            pagination={false}
            conditionalRowStyles={conditionalRowStyles}
            dataConverter={converter}
        />
    );
};
