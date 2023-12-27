import api from './axios';

export interface WasherDto {
    id: number;
    name: string;
    level: number;
    isAvailable: boolean;
}

export async function getWashers() {
    return await api.get<WasherDto[]>('/washers/all', { withCredentials: true });
}
