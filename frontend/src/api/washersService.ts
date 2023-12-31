import { apiWithCredentials } from './axios';

export interface WasherDto {
    id: number;
    name: string;
    level: number;
    isAvailable: boolean;
}

export async function getWashers() {
    return apiWithCredentials.get<WasherDto[]>('/washers/all');
}

export async function updateWasher(id: number, updatedWasher: WasherDto) {
    return apiWithCredentials.put(`/washers/${id}`, updatedWasher);
}
