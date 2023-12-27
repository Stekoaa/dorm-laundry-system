import React, { useEffect, useState } from 'react';
import { getWashers, WasherDto } from '../../api';
import DataTable from '../common/table/DataTableBase';
import { useReservationWasherPanel } from './useReservationWasherPanel';

export const ReservationWasherPanel: React.FC = () => {
    const [data, setData] = useState<WasherDto[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const { columns, conditionalRowStyles } = useReservationWasherPanel();

    useEffect(() => {
        const fetchWashers = async () => {
            setLoading(true);
            const response = await getWashers();
            setData(response.data);
            setLoading(false);
        };
        
        fetchWashers().catch((error) => {
            setLoading(false);
            console.error(error);
        });
    }, []);
    
    return (
        <DataTable
            columns={columns}
            data={data!}
            progressPending={loading}
            conditionalRowStyles={conditionalRowStyles}
        />
    );
};
