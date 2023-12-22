import React, {FormEvent, useEffect, useRef, useState} from 'react';
import { InputField, useInputField } from '../input';
import { EMAIL_REGEX, FIRST_NAME_REGEX, PWD_REGEX, SURNAME_REGEX, USERNAME_REGEX } from '../../utils';
import { faCheck, faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthFormLabel } from './AuthFormLabel';
import { submitSignup } from '../../api';
import { AxiosError } from 'axios';
import {Link} from 'react-router-dom';

export const RegistrationForm: React.FC = () => {
    const username = useInputField('', USERNAME_REGEX.test.bind(USERNAME_REGEX));
    const firstName = useInputField('', FIRST_NAME_REGEX.test.bind(FIRST_NAME_REGEX));
    const surname = useInputField('', SURNAME_REGEX.test.bind(SURNAME_REGEX));
    const email = useInputField('', EMAIL_REGEX.test.bind(EMAIL_REGEX));
    const pwd = useInputField('', PWD_REGEX.test.bind(PWD_REGEX));
    const matchPwd = useInputField('', undefined, pwd.value);

    const [errMsg, setErrMsg] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);
    const errRef = useRef<HTMLParagraphElement>(null);

    const clearFields = () => {
        username.setValue('');
        firstName.setValue('');
        surname.setValue('');
        email.setValue('');
        pwd.setValue('');
        matchPwd.setValue('');
    };

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
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
                } else {
                    setErrMsg('Registration failed');
                }
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

    const renderFieldLabel = (htmlFor: string, labelText: string, fieldValid: boolean, fieldValue: string) => {
        return (
            <AuthFormLabel
                htmlFor={htmlFor}
                labelText={labelText}
                iconValid={faCheck}
                iconInvalid={faTimes}
                classNameValid={fieldValid ? 'valid' : 'hide'}
                classNameInvalid={(fieldValid || !fieldValue) ? 'hide' : 'invalid'}
                showHints={true}
            />
        );
    };

    const formInvalid = !username.valid || !firstName.valid || !surname.valid || !email.valid || !pwd.valid || !matchPwd.valid;

    return (
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href='#'>Sign In</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live='assertive'>{errMsg}</p>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        {renderFieldLabel('username', 'Username', username.valid, username.value)}
                        <InputField
                            id='username'
                            value={username.value}
                            onFocus={() => username.setFocus(true)}
                            onBlur={() => username.setFocus(false)}
                            type='text'
                            onChange={(e) => username.setValue(e.target.value)}
                            required={true}
                            ariaInvalid={username.valid}
                            ariaDescribedBy='uidnote'
                            ref={username.inputRef}
                        />
                        <p id='uidnote'
                           className={username.focused && username.value && !username.valid ? 'instructions' : 'offscreen'}>
                            <FontAwesomeIcon icon={faInfoCircle}/>
                            3 to 20 characters.<br/>
                            Must begin with a letter.<br/>
                            Letters, numbers, underscores, hyphens allowed.
                        </p>
                        {renderFieldLabel('firstName', 'First name', firstName.valid, firstName.value)}
                        <InputField
                            id='firstName'
                            value={firstName.value}
                            onFocus={() => firstName.setFocus(true)}
                            onBlur={() => firstName.setFocus(false)}
                            type='text'
                            onChange={(e) => firstName.setValue(e.target.value)}
                            required={true}
                            ariaInvalid={firstName.valid}
                            ariaDescribedBy='uidnote'
                            ref={firstName.inputRef}
                        />
                        {renderFieldLabel('surname', 'Surname', surname.valid, surname.value)}
                        <InputField
                            id='surname'
                            value={surname.value}
                            onFocus={() => surname.setFocus(true)}
                            onBlur={() => surname.setFocus(false)}
                            type='text'
                            onChange={(e) => surname.setValue(e.target.value)}
                            required={true}
                            ariaInvalid={surname.valid}
                            ariaDescribedBy='uidnote'
                            ref={surname.inputRef}
                        />
                        {renderFieldLabel('email', 'Email', email.valid, email.value)}
                        <InputField
                            id='email'
                            value={email.value}
                            onFocus={() => email.setFocus(true)}
                            onBlur={() => email.setFocus(false)}
                            type='text'
                            onChange={(e) => email.setValue(e.target.value)}
                            required={true}
                            ariaInvalid={email.valid}
                            ariaDescribedBy='uidnote'
                            ref={email.inputRef}
                        />
                        {renderFieldLabel('password', 'Password', pwd.valid, pwd.value)}
                        <InputField
                            type='password'
                            id='password'
                            onChange={(e) => pwd.setValue(e.target.value)}
                            value={pwd.value}
                            required
                            ariaInvalid={pwd.valid}
                            ariaDescribedBy='pwdnote'
                            onFocus={() => pwd.setFocus(true)}
                            onBlur={() => pwd.setFocus(false)}
                            ref={pwd.inputRef}
                        />
                        <p id='pwdnote' className={pwd.focused && !pwd.valid ? 'instructions' : 'offscreen'}>
                            <FontAwesomeIcon icon={faInfoCircle}/>
                            8 to 24 characters.<br/>
                            Must include uppercase and lowercase letters, a number and a special character.<br/>
                        </p>

                        <label htmlFor='confirm_pwd'>
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck}
                                             className={matchPwd.valid && matchPwd.value ? 'valid' : 'hide'}/>
                            <FontAwesomeIcon icon={faTimes}
                                             className={matchPwd.valid || !matchPwd.value ? 'hide' : 'invalid'}/>
                        </label>
                        <input
                            type='password'
                            id='confirm_pwd'
                            onChange={(e) => matchPwd.setValue(e.target.value)}
                            value={matchPwd.value}
                            required
                            aria-invalid={matchPwd.valid ? 'false' : 'true'}
                            aria-describedby='confirmnote'
                            onFocus={() => matchPwd.setFocus(true)}
                            onBlur={() => matchPwd.setFocus(false)}
                            ref={matchPwd.inputRef}
                        />
                        <p id='confirmnote'
                           className={matchPwd.focused && !matchPwd.valid ? 'instructions' : 'offscreen'}>
                            <FontAwesomeIcon icon={faInfoCircle}/>
                            Must match the first password input field.
                        </p>
                        <button disabled={formInvalid}>Sign Up</button>
                    </form>
                    <p>
                        Already registered?<br/>
                        <span className='line'>
                            <Link to='/'>Sign In</Link>
                        </span>
                    </p>
                </section>
            )}
        </>
    );
};
