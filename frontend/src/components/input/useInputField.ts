import { useEffect, useRef, useState } from 'react';

type ValidationFunction = (value: string) => boolean;

export const useInputField = (
    initialValue: string,
    customValidation?: ValidationFunction,
    matchingField?: string
) => {
    const [value, setValue] = useState<typeof initialValue>(initialValue);
    const [valid, setValid] = useState<boolean>(false);
    const [focused, setFocus] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        let isValid = true;
        if (customValidation) {
            isValid = customValidation(value);
        }
        if (matchingField) {
            isValid = isValid && value === matchingField;
        }
        setValid(isValid);
    }, [value, matchingField]);

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const handleFocus = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return {
        value,
        setValue,
        handleChange,
        valid,
        setValid,
        focused,
        setFocus,
        inputRef,
        handleFocus,
    };
};