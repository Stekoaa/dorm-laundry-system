import { TableColumn } from "react-data-table-component";
import { ButtonWithMenu } from "../common/ButtonWithMenu";
import React from "react";
import { useNavigate } from "react-router-dom";

interface DataRow {
    id: number;
    name: string;
    level: number;
    isAvailable: boolean;
}

export const useReservationWasherPanel = () => {
    const navigate = useNavigate();

    const handleReservationButtonClick = (id: number) => {
        navigate(`/book/washer?id=${id}`);
    };

    const generateMenuItemsProps = (id: number) => ({
        onClick: () => handleReservationButtonClick(id), // Pass the ID to the handler
        text: 'Book',
    });

    const columns: TableColumn<DataRow>[] = [
        {
            name: 'Name',
            selector: row => row.name,
        },
        {
            name: 'Available',
            selector: row => row.isAvailable,
            format: row => row.isAvailable ? "yes" : "no"
        },
        {
            name: 'Level',
            selector: row => row.level
        },
        {
            cell: (row) =>
                <ButtonWithMenu
                menuItemsProps={[generateMenuItemsProps(row.id)]}
                disabled={!row.isAvailable}
                />,
            button: true,
            grow: 2
        }
    ];

    const conditionalRowStyles = [
        {
            when: (row: DataRow) => !row.isAvailable,
            style: {
                backgroundColor: '#f2f2f2', // Change background color for unavailable rows
                color: '#888'
            },
        },
    ];

    return { columns, conditionalRowStyles };
};
