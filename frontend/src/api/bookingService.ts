import { apiWithCredentials } from './axios';
import { UserDto } from "./authService";
import {WasherDto} from "./washersService";

interface TimeSlotDto {
    id: number;
    startTime: string;
    endTime: string;
    date: string;
}

export interface SlotsByDay {
    [date: string]: TimeSlotDto[];
}

export interface ReservationDto {
    id: number
    userDto: UserDto;
    timeSlotDto: TimeSlotDto;
    washerDto: WasherDto;
}

export async function getWasherAvailability(washerId: number, startDate: Date, endDate: Date) {
    return apiWithCredentials.get<SlotsByDay>('/bookings/availableTimeSlots',
        {
            params: {
                washerId: washerId,
                startDate: startDate.toISOString().split('T')[0],
                endDate: endDate.toISOString().split('T')[0]
            },
        },
    );
}

export async function makeReservation(washerId: number, timeSlotId: number) {
    return apiWithCredentials.post('/bookings/book',
        {},
        {
            params: {
                washerId: washerId,
                slotId: timeSlotId
            },
        });
}

export async function getAllReservations() {
    return apiWithCredentials.get<ReservationDto[]>('/bookings/all');
}

export async function getUserReservation() {
    return apiWithCredentials.get<ReservationDto[]>('/bookings/myReservations');
}

export async function deleteReservation(reservationId: number) {
    return apiWithCredentials.delete(`/bookings/${reservationId}`);
}
