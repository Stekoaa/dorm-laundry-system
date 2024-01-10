import React, {FormEvent, useContext, useEffect, useState} from "react";
import { Form } from "../../common/form/Form";
import { AxiosError } from "axios";
import { reportDamage } from "../../../api/damageService";
import { AuthContext, AuthContextType } from "../../../context";
import { useInputField } from "../../input";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faInfoCircle, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FormLabel} from "../../common/form/FormLabel";
import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";

export const DamageReportForm: React.FC = () => {
    const { user } = useContext<AuthContextType>(AuthContext);
    const description = useInputField('', (input: string) => input.length >= 5 && input.length <= 100);
    const [errMsg, setErrMsg] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);
    const navigate = useNavigate();

    const washerId = parseInt(new URLSearchParams(location.search).get('washerId')!, 10);

    const handleBack = () => navigate('/washers');

    const renderFieldLabel = (htmlFor: string, labelText: string, fieldValid: boolean, fieldValue: string) => {
        return (
            <FormLabel
                htmlFor={htmlFor}
                labelText={labelText}
                iconValid={faCheck}
                iconInvalid={faTimes}
                classNameValid={(fieldValid && fieldValue) ? 'valid' : 'hide'}
                classNameInvalid={(fieldValid || !fieldValue) ? 'hide' : 'invalid'}
                showHints={true}
            />
        );
    };

    const fields = [
        {
            id: 'description',
            label: renderFieldLabel('description', 'Description', description.valid, description.value),
            type: 'text',
            value: description.value,
            valid: description.valid,
            setFocus: (focus: boolean) => description.setFocus(focus),
            setValue: (value: string) => description.setValue(value),
            required: true,
            hint: <p id='uidnote'
                     className={description.focused && description.value && !description.valid ? 'instructions' : 'offscreen'}>
                <FontAwesomeIcon icon={faInfoCircle}/>
                Numbers of chars in description must be between 5 and 100.
            </p>
        }
    ];

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await reportDamage({
                username: user!.username,
                washerId: washerId,
                description: description.value
            });
            setSuccess(true);
            setTimeout(() => {
                navigate('/washers'); // Navigate after a short delay
            }, 3000);
        } catch (err) {
            if (err instanceof AxiosError) {
                if (!err?.response) {
                    setErrMsg('No server response');
                } else if (err.response?.status === 400) {
                    setErrMsg('Invalid request');
                }
            } else {
                setErrMsg('Reporting failed');
            }
        }
    };

    useEffect(() => {
        setErrMsg('');
    }, [description.value]);

    const backButton = <Button variant='contained' onClick={handleBack} disabled={success} style={{ backgroundColor: 'red' }}>Back</Button>;

    const onSuccessSection =
            <>
                <h1>Your damage report has been submitted successfully</h1>
            </>;

    
    return (
        <>
            <section style={{maxHeight: '200px', minHeight: '50px', justifyContent: 'flex-end'}}>
                <h1> Report damage </h1>
            </section>
            <Form
                fields={fields}
                onSubmit={handleSubmit}
                success={success}
                errorMessage={errMsg}
                onSuccessSection={onSuccessSection}
                footer={backButton}
            />
        </>
    );
};
