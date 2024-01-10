import { TableColumn } from 'react-data-table-component';
import { ButtonWithMenu } from '../../common/ButtonWithMenu';
import React, {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {AuthContext, AuthContextType} from "../../../context";
import {ROLES} from "../../../Roles";
import {updateWasher} from "../../../api/washersService";

interface DataRow {
    id: number;
    name: string;
    level: number;
    isAvailable: boolean;
}

export const useWashersPanel = () => {
    const [updatedId, setUpdatedId] = useState<number>();
    const navigate = useNavigate();
    const { user } = useContext<AuthContextType>(AuthContext);

    const isAdmin = user?.roles.map(role => role.authority).includes(ROLES.ADMIN);

    const handleReservationButtonClick = (id: number) => navigate(`/book/washer?id=${id}`);

    const handleReportDamageButtonClick = (id: number) => navigate(`/damage?washerId=${id}`);

    const handleSetWasherAvailability = async(row: DataRow) => {
        const updatedWasher = {...row, isAvailable: !row.isAvailable};
        await updateWasher(row.id, updatedWasher).catch(error => console.error(error));

        row.id !== updatedId ? setUpdatedId(row.id) : setUpdatedId(-1);
    };

    const userMenuItemsProps = (id: number) => (
        [
            {
                onClick: () => handleReservationButtonClick(id),
                text: 'Book',
            },
            {
                onClick: () => handleReportDamageButtonClick(id),
                text: 'Report damage',
            }
        ]
    );

    const adminMenuItemProps = (row: DataRow) => (
        [
            {
                onClick: () => handleSetWasherAvailability(row),
                'text': row.isAvailable ? 'Mark as unavailable' : 'Mark as available'
            }
        ]
    );

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
                    menuItemsProps={isAdmin ? adminMenuItemProps(row) : userMenuItemsProps(row.id)}
                    disabled={!isAdmin && !row.isAvailable}
                />,
            button: true,
        }
    ];

    const conditionalRowStyles = [
        {
            when: (row: DataRow) => !isAdmin && !row.isAvailable,
            style: {
                backgroundColor: '#f2f2f2',
                color: '#888'
            },
        },
    ];

    return { columns, conditionalRowStyles, updatedId };
};
