import React from "react";
import './FilterComponent.css';

interface FilterComponentProps {
    filterText: string;
    placeholder?: string
    onFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClear: (e: React.MouseEvent<HTMLElement>) => void;
}

export const FilterComponent: React.FC<FilterComponentProps> = ({ filterText, placeholder, onFilter, onClear }) => {
    return (
        <>
            <input
                id="search"
                type="text"
                placeholder={placeholder ?? ''}
                aria-label="Search Input"
                value={filterText}
                onChange={onFilter}
                className="filterInput"
            />
            <button type='button' onClick={onClear} className='filterButton'>
                X
            </button>
        </>
    );
};