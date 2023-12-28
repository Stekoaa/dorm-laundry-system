import DataTable, {TableProps, Alignment } from 'react-data-table-component';

const customStyles = {
    header: {
        style: {
            maxHeight: '56px',
            fontSize: '24px',
            textAlign: Alignment.LEFT,
        },
    },
    responsiveWrapper: {
        style: {
            height: '100%'
        }
    },
    tableWrapper: {
        style: {
            height: '100%'
        }
    },
    head: {
        style: {
            fontSize: '18px'
        }
    },
    rows: {
        style: {
            fontSize: '16px'
        }
    },
    pagination: {
        style: {
            width: '100vw'
        }
    }
};

const paginationComponentOptions = {
    noRowsPerPage: true
};

function DataTableBase<T>(props: TableProps<T>) {
    return (
        <DataTable
            title='Washers'
            customStyles={customStyles}
            paginationComponentOptions={paginationComponentOptions}
            {...props}
        />
    );
}

export default DataTableBase;