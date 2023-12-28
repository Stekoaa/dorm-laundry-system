import { TableColumn } from 'react-data-table-component';
import { ButtonWithMenu } from '../common/ButtonWithMenu';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface DataRow {
    id: number;
    name: string;
    level: number;
    isAvailable: boolean;
}

export const useWashersPanel = () => {
    const navigate = useNavigate();
    const handleReservationButtonClick = (id: number) => navigate(`/book/washer?id=${id}`);
    
    const menuItemsProps = (id: number) => ([
        {
            onClick: () => handleReservationButtonClick(id),
            text: 'Book',
        }
        ]);

    const columns: TableColumn<DataRow>[] = [
        {
            name: 'Name',
            selector: row => row.name,
        },
        {
            name: 'Available',
            selector: row => row.isAvailable,
            format: row => row.isAvailable ? 'Yes' : 'No'
        },
        {
            name: 'Level',
            selector: row => row.level
        },
        {
            cell: (row) =>
                <ButtonWithMenu
                    menuItemsProps={menuItemsProps(row.id)}
                    disabled={!row.isAvailable}
                />,
            button: true,
        }
    ];

    const conditionalRowStyles = [
        {
            when: (row: DataRow) => !row.isAvailable,
            style: {
                backgroundColor: '#f2f2f2',
                color: '#888'
            },
        },
    ];

    return { columns, conditionalRowStyles };
};
