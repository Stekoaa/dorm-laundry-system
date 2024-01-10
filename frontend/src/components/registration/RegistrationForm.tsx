import React, {FormEvent, useEffect,  useState} from 'react';
import { useInputField } from '../input';
import { EMAIL_REGEX, FIRST_NAME_REGEX, PWD_REGEX, SURNAME_REGEX, USERNAME_REGEX } from '../../utils';
import {faCheck, faInfoCircle, faTimes} from '@fortawesome/free-solid-svg-icons';
import { Form } from '../common/form/Form';
import { FormLabel } from '../common/form/FormLabel';
import { submitSignup } from '../../api';
import { AxiosError } from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link} from "react-router-dom";

export const RegistrationForm: React.FC = () => {
    const username = useInputField('', USERNAME_REGEX.test.bind(USERNAME_REGEX));
    const firstName = useInputField('', FIRST_NAME_REGEX.test.bind(FIRST_NAME_REGEX));
    const surname = useInputField('', SURNAME_REGEX.test.bind(SURNAME_REGEX));
    const email = useInputField('', EMAIL_REGEX.test.bind(EMAIL_REGEX));
    const pwd = useInputField('', PWD_REGEX.test.bind(PWD_REGEX));
    const matchPwd = useInputField('', undefined, pwd.value);

    const [errMsg, setErrMsg] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);
    //const errRef = useRef<HTMLParagraphElement>(null);

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
            id: 'username',
            label: renderFieldLabel('username', 'Username', username.valid, username.value),
            type: 'text',
            value: username.value,
            valid: username.valid,
            setFocus: (focus: boolean) => username.setFocus(focus),
            setValue: (value: string) => username.setValue(value),
            required: true,
            hint: <p id='uidnote'
                     className={username.focused && username.value && !username.valid ? 'instructions' : 'offscreen'}>
                <FontAwesomeIcon icon={faInfoCircle}/>
                3 to 20 characters.<br/>
                Must begin with a letter.<br/>
                Letters, numbers, underscores, hyphens allowed.
            </p>
        },
        {
            id: 'firstName',
            label: renderFieldLabel('firstName', 'First name', firstName.valid, firstName.value),
            type: 'text',
            value: firstName.value,
            valid: firstName.valid,
            setFocus: (focus: boolean) => firstName.setFocus(focus),
            setValue: (value: string) => firstName.setValue(value),
            required: true,
            //inputRef: firstNameRef,
        },
        {
            id: 'surname',
            label: renderFieldLabel('surname', 'Surname', surname.valid, surname.value),
            type: 'text',
            value: surname.value,
            valid: surname.valid,
            setFocus: (focus: boolean) => surname.setFocus(focus),
            setValue: (value: string) => surname.setValue(value),
            required: true
        },
        {
            id: 'email',
            label: renderFieldLabel('email', 'Email', email.valid, email.value),
            type: 'text',
            value: email.value,
            valid: email.valid,
            setFocus: (focus: boolean) => email.setFocus(focus),
            setValue: (value: string) => email.setValue(value),
            required: true
            //inputRef: emailRef,
        },
        {
            id: 'pwd',
            label: renderFieldLabel('password', 'Password', pwd.valid, pwd.value),
            type: 'password',
            value: pwd.value,
            valid: pwd.valid,
            setFocus: (focus: boolean) => pwd.setFocus(focus),
            setValue: (value: string) => pwd.setValue(value),
            required: true,
            hint: <p id='pwdnote' className={pwd.focused && !pwd.valid ? 'instructions' : 'offscreen'}>
                <FontAwesomeIcon icon={faInfoCircle}/>
                8 to 24 characters.<br/>
                Must include uppercase and lowercase letters, a number and a special character.<br/>
            </p>,
            //inputRef: pwdRef,
        },
        {
            id: 'matchPwd',
            label: renderFieldLabel('confirm_pwd', 'Confirm password', matchPwd.valid, matchPwd.value),
            type: 'password',
            value: matchPwd.value,
            valid: matchPwd.valid,
            setFocus: (focus: boolean) => matchPwd.setFocus(focus),
            setValue: (value: string) => matchPwd.setValue(value),
            required: true,
            hint: <p id='confirmnote' className={matchPwd.focused && !matchPwd.valid ? 'instructions' : 'offscreen'}>
                <FontAwesomeIcon icon={faInfoCircle}/>
                Must match the first password input field.
            </p>
            //inputRef: matchPwdRef,
        },
    ];

    const clearFields = () => {
        username.setValue('');
        firstName.setValue('');
        surname.setValue('');
        email.setValue('');
        pwd.setValue('');
        matchPwd.setValue('');
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await submitSignup({
                username: username.value,
                firstName: firstName.value,
                surname: surname.value,
                email: email.value,
                password: pwd.value
            });

            setSuccess(true);
            clearFields();
        } catch (err) {
            if (err instanceof AxiosError) {
                if (!err?.response) {
                    setErrMsg('No server response');
                } else if (err.response?.status === 409) {
                    setErrMsg('Username or email in use');
                }
            } else {
                setErrMsg('Registration failed');
            }
        }
    };

    useEffect(() => {
        if (username.inputRef.current) {
            username.inputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [username.value, firstName.value, surname.value, email.value, pwd.value, matchPwd.value]);

    const footer =
        <p> Already registered?<br/>
            <span className='line'>
                <Link to='/'>Sign In</Link>
            </span>
        </p>;

    const onSuccessSection =
        <>
            <h1>Success!</h1>
            <p><Link to='/login'> Sign in </Link></p>
        </>;

    return (
        <Form
            fields={fields}
            onSubmit={handleSubmit}
            success={success}
            errorMessage={errMsg}
            footer={footer}
            onSuccessSection={onSuccessSection}
        />
    );
};
