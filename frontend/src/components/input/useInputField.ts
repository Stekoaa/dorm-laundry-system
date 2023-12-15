import { useEffect, useRef, useState } from 'react';

export const useInputField = (initialValue: string, customValidation: any | undefined,
                              matchingField: string | undefined = undefined, name="dupa") => {

    const [value, setValue] = useState<typeof initialValue>(initialValue);
    const [valid, setValid] = useState<boolean>(false);
    const [focused, setFocus] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        console.log("custom validation: ", customValidation);
        if (customValidation) {
            console.log(valid);
            setValid(customValidation(value));
        }
        if (matchingField) {
            setValid(value === matchingField);
        }
    }, [value, matchingField]);

    const handleChange = (newValue: string) => {
        setValue(newValue);
    }

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
    }
}