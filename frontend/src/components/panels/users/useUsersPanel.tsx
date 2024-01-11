import {TableColumn} from "react-data-table-component";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
import {ButtonWithMenu} from "../../common/ButtonWithMenu";
import React, {useState} from "react";
import {FilterComponent} from "../../common/FilterComponent";
import {banUser, deleteUser, getAllUsers, unbanUser, UserDto} from "../../../api/usersService";

interface UserRow {
    id: number
    username: string;
    firstName: string;
    surname: string;
    email: string;
    banned: boolean;
}

export const useUsersPanel = () => {
    const [idDeleted, setIdDeleted] = useState<number>();
    const [idUpdated, setIdUpdated] = useState<number>();

    const menuItemsProps = (row: UserRow) => [
        {
            onClick: () => handleDeleteButtonClick(row.id),
            text: 'Delete',
        },
        {
            onClick: () => row.banned ? handleUnbanButtonClick(row) : handleBanButtonClick(row),
            text: row.banned ? 'Unban' : 'Ban'
        }
    ];

    const handleDeleteButtonClick = async(id: number) => {
        await deleteUser(id);
        setIdDeleted(id);
    };

    const handleBanButtonClick = async(row: UserRow) => {
        console.log(row.id);
        await banUser(row.id);
        setIdUpdated(row.id);
        row.id !== idUpdated ? setIdUpdated(row.id) : setIdUpdated(-1);
    };

    const handleUnbanButtonClick = async(row: UserRow) => {
        await unbanUser(row.id);
        setIdUpdated(row.id);
        row.id !== idUpdated ? setIdUpdated(row.id) : setIdUpdated(-1);
    };

    const columns: TableColumn<UserRow>[] = [
        {
            name: 'Username',
            selector: (row) => row.username,
            sortable: true
        },
        {
            name: 'Name',
            selector: (row) => row.firstName,
            format: (row) => row.firstName + ' ' + row.surname
        },
        {
            name: 'Email',
            selector: (row) => row.email,
        },
        {
            name: 'Banned',
            selector: (row) => row.banned,
            grow: 0.5,
            format: (row) => row.banned ? <FontAwesomeIcon icon={faCheck}/>
                : <FontAwesomeIcon icon={faTimes}/>,
            center: true
        },
        {
            cell: (row) =>
                <ButtonWithMenu
                    menuItemsProps={menuItemsProps(row)}
                    disabled={false}
                />,
            button: true,
        }
    ];

    const [filterText, setFilterText] = useState<string>('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState<boolean>(false);

    const handleClear = () => {
        if (filterText) {
            setResetPaginationToggle(!resetPaginationToggle);
            setFilterText('');
        }
    };

    const filterComponent = (
        <FilterComponent
            onFilter={(e) => setFilterText(e.target.value)}
            onClear={handleClear}
            filterText={filterText}
            placeholder='Search by name'
        />
    );

    const filterFunction = (data: UserRow[] | undefined) => {
        if (data) {
            return data.filter((item) =>
                (item.firstName + ' ' + item.surname)?.toLowerCase().includes(filterText.toLowerCase())
            );
        }
        return data;
    };

    const fetchFunction = getAllUsers;
    const dataConverter = (items: UserDto[]) => items;


    return { columns, fetchFunction, dataConverter, filterFunction, filterComponent, idDeleted, idUpdated };
};