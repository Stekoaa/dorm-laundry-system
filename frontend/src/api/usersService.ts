import {apiWithCredentials} from "./axios";

export interface UserDto {
    id: number;
    username: string;
    firstName: string;
    surname: string;
    email: string;
    banned: boolean;
}

export async function getAllUsers() {
    return apiWithCredentials.get<UserDto[]>('/users/all');
}

export async function banUser(userId: number){
    return apiWithCredentials.put(`/users/${userId}/ban`);
}

export async function unbanUser(userId: number) {
    return apiWithCredentials.put(`/users/${userId}/unban`);
}

export async function deleteUser(userId: number) {
    return apiWithCredentials.delete(`/users/${userId}`);
}
