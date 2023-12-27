import { api } from './axios';

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

interface LoginResponseDto {
    token: string;
}


export async function submitSignup(params: SignupRequestDto) {
    return api.post<SignupRequestDto>('/auth/signup', params);
}

export async function submitSignin(params: LoginRequestDto) {
    return api.post<LoginResponseDto>('/auth/signin', params);
}
