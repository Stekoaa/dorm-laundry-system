import React, {ChangeEvent, FC} from 'react';

interface InputFieldProps {
    id: string;
    value: string;
    onFocus: () => void;
    onBlur: () => void;
    type: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    required: boolean;
    ariaInvalid: boolean;
    ariaDescribedBy: string;
    placeholder?: string;
    ref?: React.RefObject<HTMLInputElement>;
}

export const InputField: FC<InputFieldProps> = ({
    id,
    value,
    onFocus,
    onBlur,
    type,
    onChange,
    required,
    ariaInvalid,
    ariaDescribedBy,
    placeholder,
    ref
}) => {
    return (
        <>
            <input
                type={type}
                ref={ref}
                id={id}
                onChange={onChange}
                value={value}
                required={required}
                aria-invalid={ariaInvalid}
                aria-describedby={ariaDescribedBy}
                onFocus={onFocus}
                onBlur={onBlur}
                placeholder={placeholder}
            />
        </>
    );
};
