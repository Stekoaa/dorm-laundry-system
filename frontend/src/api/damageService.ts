import { apiWithCredentials } from "./axios";

export interface DamageReportDto {
    washerId: number;
    username: string;
    description: string;
}

export interface DamageDto {
    id: number;
    userFirstName: string;
    userSurname: string;
    washerName: string;
    description: string;
    fixed: boolean;
    reportTime: Date;
}

export async function reportDamage(damageReport: DamageReportDto) {
    return apiWithCredentials.post(
        '/damages/all',
        damageReport,
    );
}

export async function getAllDamages() {
    return apiWithCredentials.get<DamageDto[]>("/damages");
}

export async function updateDamage(id: number, damage: DamageDto) {
    return apiWithCredentials.put(`/damages/${id}`, damage);
}
