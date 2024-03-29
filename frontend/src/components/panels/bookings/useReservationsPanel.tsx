import { TableColumn } from 'react-data-table-component';
import { ButtonWithMenu } from '../../common/ButtonWithMenu';
import React, {useState} from 'react';
import {deleteReservation, getAllReservations, getUserReservation, ReservationDto} from '../../../api/bookingService';
import { FilterComponent } from '../../common/FilterComponent';

export interface ReservationRow {
    id: number;
    washer: string;
    date: string;
    startTime: string;
    endTime: string;
    username?: string;
    firstName?: string;
    surname?: string;
}

const dateSortFunction = (rowA: ReservationRow, rowB: ReservationRow) => {
    const dateA = new Date(rowA.date);
    const dateB = new Date(rowB.date);

    return dateA.getTime() - dateB.getTime();
};

export const useReservationsPanel = (isAdmin: boolean) => {
    const [idDeleted, setIdDeleted] = useState<number>();

    const menuItemsProps = (id: number) => [
        {
            onClick: () => handleDeleteButtonClick(id),
            text: 'Delete',
        },
    ];

    const handleDeleteButtonClick = async(id: number) => {
        await deleteReservation(id);
        setIdDeleted(id);
    };

    const cancelButtonDisabled = (date: string, endTime: string) => {
        const dateTimeString = `${date}T${endTime}`;
        const combinedDateTime = new Date(dateTimeString);
        const currentDateTime = new Date();

        return combinedDateTime < currentDateTime;
    };

    const commonColumns: TableColumn<ReservationRow>[] = [
        {
            name: 'Washer',
            selector: (row) => row.washer,
        },
        {
            name: 'Date',
            selector: (row) => row.date,
            sortable: true,
            sortFunction: dateSortFunction,
        },
        {
            name: 'Time',
            selector: (row) => `${row.startTime}-${row.endTime}`,
        },
    ];

    const userColumns: TableColumn<ReservationRow>[] = [
        ...commonColumns,
        {
            cell: (row) => (
                <ButtonWithMenu
                    menuItemsProps={menuItemsProps(row.id)}
                    disabled={cancelButtonDisabled(row.date, row.endTime)}
                />
            ),
            button: true
        },
    ];

    const adminColumns: TableColumn<ReservationRow>[] = [
        ...commonColumns,
        {
            name: 'Name',
            selector: (row) => `${row.firstName} ${row.surname}`,
        },
    ];

    const dataConverter = (items: ReservationDto[]) => {
        return items.map((item) => ({
            id: item.id,
            washer: item.washerDto.name,
            date: item.timeSlotDto.date,
            startTime: item.timeSlotDto.startTime,
            endTime: item.timeSlotDto.endTime,
            username: item.userDto.username,
            firstName: item.userDto.firstName,
            surname: item.userDto.surname,
        }));
    };

    const [filterText, setFilterText] = useState<string>('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState<boolean>(false);

    const handleClear = () => {
        if (filterText) {
            setResetPaginationToggle(!resetPaginationToggle);
            setFilterText('');
        }
    };

    const subHeaderComponentMemo = (
        <FilterComponent
            onFilter={(e) => setFilterText(e.target.value)}
            onClear={handleClear}
            filterText={filterText}
            placeholder='Search by name'
        />
    );

    const filterFunction = (data: ReservationRow[] | undefined) => {
        if (data) {
            return data.filter((item) =>
                (item.firstName + ' ' + item.surname)?.toLowerCase().includes(filterText.toLowerCase())
            );
        }
        return data;
    };

    const columns = isAdmin ? adminColumns : userColumns;
    const fetchFunction = isAdmin ? getAllReservations : getUserReservation;
    const filterFun = isAdmin ? filterFunction : undefined;
    const filterComponent = isAdmin ? subHeaderComponentMemo : undefined;

    return { columns, fetchFunction, dataConverter, filterFun, filterComponent, idDeleted };
};
