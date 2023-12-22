import api from './axios';

interface SignupRequestDto {
    username: string;
    firstName: string;
    surname: string;
    email: string;
    password: string;
}

interface LoginRequestDto {
    username: string;
    password: string;
}

export async function submitSignup(params: SignupRequestDto) {
    const response = await api.post<SignupRequestDto>('/auth/signup',
        params,
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        });
    return response.data;
}

export async function submitSignin(params: LoginRequestDto) {
    return await api.post<string>('/auth/signin',
        params,
        {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true
        });
}
