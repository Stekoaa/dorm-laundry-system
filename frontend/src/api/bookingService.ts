import { apiWithCredentials } from './axios';

interface TimeSlot {
    id: number;
    startTime: string;
    endTime: string;
}

export interface SlotsByDay {
    [date: string]: TimeSlot[];
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
    return await apiWithCredentials.post('/bookings/book',
        {},
        {
            params: {
                washerId: washerId,
                slotId: timeSlotId
            },
        });
}
