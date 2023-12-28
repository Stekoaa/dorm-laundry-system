import React, { useEffect, useState} from 'react';
import {ConditionalStyles, TableColumn} from "react-data-table-component";
import { AxiosResponse } from "axios";
import DataTable from "../../common/table/DataTableBase";

type FetchFunction<T> = () => Promise<AxiosResponse<T[]>>;

interface PanelProps<T, K> {
    fetchFunction: FetchFunction<T>
    columns: TableColumn<K>[];
    pagination?: boolean;
    conditionalRowStyles?: ConditionalStyles<K>[];
    dataConverter: (data: T[]) => K[];
    filterFunction?: (data: K[] | undefined) => typeof data;
    subHeaderComponent?: React.ReactNode;
}

export const Panel = <T,K,>(props: PanelProps<T, K>) => {
    const [data, setData] = useState<K[]>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await props.fetchFunction();
            console.log(props.dataConverter(response.data));
            setData(props.dataConverter(response.data));
            setLoading(false);
        };

       fetchData().catch((error) => {
            setLoading(false);
            console.error(error);
        });
    }, []);

    const filteredData = props.filterFunction ? props.filterFunction(data) : data;

    return (
        <DataTable
            columns={props.columns}
            data={filteredData!}
            progressPending={loading}
            conditionalRowStyles={props.conditionalRowStyles}
            pagination={props.pagination}
            subHeader
            subHeaderComponent={props.subHeaderComponent}
        />
    );
};
