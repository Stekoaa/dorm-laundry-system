import DataTable, {TableProps, Alignment } from "react-data-table-component";

const customStyles = {
    header: {
        style: {
            maxHeight: '56px',
            textAlign: Alignment.LEFT,
        },
    },
}

function DataTableBase<T>(props: TableProps<T>) {
    return (
        <DataTable
            title='Washers'
            customStyles={customStyles}
            {...props}
        />
    );
}

export default DataTableBase;