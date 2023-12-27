import api from "./axios";

interface TimeSlot {
    id: number;
    startTime: string;
    endTime: string;
    available: boolean;
    day: SlotDay;
}

interface SlotDay {
    id: number;
    date: string;
}

export interface SlotsByDay {
    [date: string]: TimeSlot[];
}

export async function getWasherAvailability(washerId: number, startDate: Date, endDate: Date) {
    return await api.get<SlotsByDay>('/bookings/availableTimeSlots',
        {
            params: {
                washerId: washerId,
                startDate: startDate.toISOString().split("T")[0],
                endDate: endDate.toISOString().split("T")[0]
            },
            withCredentials: true
        },
    );
}

export async function makeReservation(washerId: number, timeSlotId: number) {
    return await api.post('/bookings/book',
        {},
        {
            params: {
                washerId: washerId,
                slotId: timeSlotId
            },
            withCredentials: true
        });
}
