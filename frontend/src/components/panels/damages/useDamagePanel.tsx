import {TableColumn} from "react-data-table-component";
import {DamageDto, getAllDamages, updateDamage} from "../../../api/damageService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
import {ButtonWithMenu} from "../../common/ButtonWithMenu";
import React, {useState} from "react";

interface DamageRow {
    id: number;
    userFirstName: string;
    userSurname: string;
    washerName: string;
    fixed: boolean;
    description: string;
    reportTime: Date;
}

export const useDamagePanel = () => {
    const [updatedId, setUpdatedId] = useState<number>();

    const handleFixedChange = async(row: DamageRow) => {
        const updatedDamage = {...row, fixed: !row.fixed};
        await updateDamage(row.id, updatedDamage).catch(error => console.error(error));
        row.id !== updatedId ? setUpdatedId(row.id) : setUpdatedId(-1);
    };

    const menuItemsProps = (row: DamageRow) => [
        {
            onClick: () => handleFixedChange(row),
            text: 'Mark as fixed',
        },
    ];

    const columns: TableColumn<DamageRow>[] = [
        {
            name: 'Washer',
            selector: (row) => row.washerName,
            sortable: true
        },
        {
            name: 'Report time',
            selector: (row) => row.reportTime.toString().slice(0, 19).replace('T', ' '),
            wrap: true,
        },
        {
            name: 'Description',
            selector: (row) => row.description,
            wrap: true,
            grow: 2
        },
        {
            name: 'Reporter',
            selector: (row) => row.userFirstName,
            format: (row) => row.userFirstName + ' ' + row.userSurname
        },
        {
            name: 'Fixed',
            selector: (row) => row.fixed,
            grow: 0.5,
            format: (row) => row.fixed ? <FontAwesomeIcon icon={faCheck}/>
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

    const fetchFunction = getAllDamages;
    const dataConverter = (items: DamageDto[]) => items;

    return { columns, fetchFunction, dataConverter, updatedId };
};