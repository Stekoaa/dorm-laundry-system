import React, {useEffect, useState} from "react";
import {getWashers, WasherDto} from "../../api";
import {AxiosError} from "axios";
import DataTable from "../common/table/DataTableBase";
import {useReservationWasherPanel} from "./useReservationWasherPanel";

export const ReservationWasherPanel: React.FC = () => {
    const [data, setData] = useState<WasherDto[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const { columns, conditionalRowStyles } = useReservationWasherPanel();

    const fetchWashers = async() => {
        try {
            setLoading(true);
            const response = await getWashers();
            setData(response.data);
        } catch (err) {
            if (err instanceof AxiosError) {
                console.error(err.response);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWashers();
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
