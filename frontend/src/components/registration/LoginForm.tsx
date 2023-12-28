import { InputField, useInputField } from '../input';
import React, { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../context';
import { submitSignin } from '../../api';
import { AxiosError } from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthFormLabel } from './AuthFormLabel';

export const LoginForm: React.FC = () => {
    const { handleLogin } = useContext(AuthContext);
    const username = useInputField('');
    const pwd = useInputField('');
    const [errMsg, setErrMsg] = useState<string>('');
    const errRef = useRef<HTMLParagraphElement>(null);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    
    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await submitSignin({
                username: username.value,
                password: pwd.value,
            });
            console.log(response.data.token);
            handleLogin(response.data.token);
            username.setValue('');
            pwd.setValue('');
            navigate(from, { replace: true });
        } catch (err) {
            if (err instanceof AxiosError) {
                if (!err?.response) {
                    setErrMsg('No server response');
                } else if (err.response?.status === 400) {
                    setErrMsg('Missing username or password');
                } else if (err.response?.status === 401) {
                    setErrMsg('Unauthorized');
                }
            } else {
                setErrMsg('Login failed');
                console.error(err);
            }
        }
    };
    
    const formInvalid = !username.valid || !pwd.valid;
    
    useEffect(() => {
        if (username.inputRef.current) {
            username.inputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [username.value, pwd.value]);

    const renderFieldLabel = (htmlFor: string, labelText: string) => {
        return (
            <AuthFormLabel
                htmlFor={htmlFor}
                labelText={labelText}
                showHints={false}
            />
        );
    };
    
    return (
        <>
            <section>
                <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live='assertive'>{errMsg}</p>
                <h1>Sign in</h1>
                <form onSubmit={handleSubmit}>
                    {renderFieldLabel('username', 'Username')}
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
                    {renderFieldLabel('password', 'Password')}
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
                    <button disabled={formInvalid}>Sign in</button>
                </form>
                <p>
                    Need an Account?<br/>
                    <span className='line'>
                        <Link to='/register'>Sign Up</Link>
                    </span>
                </p>
            </section>
        </>
    );
};
