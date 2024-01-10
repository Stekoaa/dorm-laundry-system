import React, { useEffect, useState} from 'react';
import {ConditionalStyles, TableColumn} from "react-data-table-component";
import { AxiosResponse } from "axios";
import DataTable from "../common/table/DataTableBase";

type FetchFunction<T> = () => Promise<AxiosResponse<T[]>>;
type FetchRowFunction<T> = () => Promise<AxiosResponse<T>>;

interface PanelProps<T, K extends { id: number }> {
    fetchFunction: FetchFunction<T>
    columns: TableColumn<K>[];
    title: string;
    pagination?: boolean;
    conditionalRowStyles?: ConditionalStyles<K>[];
    dataConverter: (data: T[]) => K[];
    filterFunction?: (data: K[] | undefined) => typeof data;
    subHeaderComponent?: React.ReactNode;
    fetchRowFunction?: FetchRowFunction<T>
    deletedId?: number;
    updatedId?: number;
}

export const Panel = <T, K extends { id: number; },>(props: PanelProps<T, K>) => {
    const [data, setData] = useState<K[]>();
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = async () => {
        setLoading(true);
        const response = await props.fetchFunction();
        setData(props.dataConverter(response.data));
        setLoading(false);
    };

    useEffect(() => {
        fetchData().catch((error) => {
            setLoading(false);
            console.error(error);
        });
    }, []);

    useEffect(() => {
        setData(data?.filter(item => !(item.id === props.deletedId)));
    }, [props.deletedId]);

    useEffect(() => {
        if (props.updatedId) {
            fetchData().catch((error) => {
                setLoading(false);
                console.error(error);
            });
        }
    }, [props.updatedId]);

    const filteredData = props.filterFunction ? props.filterFunction(data) : data;

    return (
        <DataTable
            title={props.title}
            columns={props.columns}
            data={filteredData!}
            progressPending={loading}
            conditionalRowStyles={props.conditionalRowStyles}
            pagination={props.pagination}
            subHeader={!!props.subHeaderComponent}
            subHeaderComponent={props.subHeaderComponent}
        />
    );
};
