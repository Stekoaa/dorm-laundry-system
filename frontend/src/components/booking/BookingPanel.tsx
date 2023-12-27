import React, {useEffect, useState} from "react";
import {Button, FormControl, InputLabel, Select, SelectChangeEvent, Typography} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {getWasherAvailability, makeReservation, SlotsByDay} from "../../api/bookingService";
import {useLocation, useNavigate} from "react-router-dom";
import {AxiosError} from "axios";

export const BookingPanel: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedTimeSlotId, setSelectedTimeSlotId] = useState<number | null>(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
    const [slots, setSlots] = useState<SlotsByDay | null>(null);
    const [message, setMessage] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);

    const navigate = useNavigate();
    const location = useLocation();

    const washerId = parseInt(new URLSearchParams(location.search).get('id')!, 10);

    const today = new Date();
    const maxDay = new Date();
    maxDay.setDate(today.getDate() + 14);

    const handleBack = () => navigate('/reservations');
    const handleCancel = () => navigate('/reservations');

    const handleTimeSlotChange = (e: SelectChangeEvent) => {
        const day = selectedDate.toISOString().split("T")[0];
        setSelectedTimeSlot(e.target.value as string);
        const selectedSlot = slots && slots[day]?.find(slot => slot.startTime === e.target.value);

        if (selectedSlot) {
            setSelectedTimeSlotId(selectedSlot.id);
        }
    };

    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
        setSelectedTimeSlot('');
        setSelectedTimeSlotId(null);
    };

    const handleBooking = async() => {
        try {
            await makeReservation(washerId!, selectedTimeSlotId!);
            setMessage('Success');
            setSuccess(true);
            setTimeout(() => {
                navigate('/reservations'); // Navigate after a short delay
            }, 3000);
        } catch (err) {
            if (err instanceof AxiosError) {
                if (!err?.response) {
                    setMessage('No response from server');
                } else if (err.response?.status === 409) {
                    setMessage('Another user has just booked this washer');
                } else {
                    setMessage('Error during creating reservation');
                }
            }
        }
    };

    useEffect(() => {
        const fetchSlots = async() => {
            const response = await getWasherAvailability(washerId, today, maxDay);
            setSlots(response.data);
        };

        fetchSlots().catch(console.error);
    }, []);

    const renderTimeSlots = () => {
        const day = selectedDate.toISOString().split("T")[0];
        if (!slots) {
            return <p>Loading...</p>;
        }
        if (!slots[day]) {
            return <p>No slots available for {day}</p>;
        }

        return (
            <>
                <InputLabel>Select an hour:</InputLabel>
                <Select value={selectedTimeSlot} onChange={handleTimeSlotChange}>
                    {slots[day].map((slot) => (
                        <MenuItem key={slot.id} value={slot.startTime}>
                            {`${slot.startTime} - ${slot.endTime}`}
                        </MenuItem>
                    ))}
                </Select>
            </>
        );
    };

    return (
        <div id="bookingPanel" style={{padding: '20px', width: '100%'}}>
            <div style={{display: 'flex', marginBottom: '20px'}}>
                <ArrowBackIcon style={{ cursor: 'pointer', marginTop: "6px" }} onClick={handleBack} /> {/* ArrowBack icon for back functionality */}
                <div style={{marginRight: '20px'}}>
                    <Typography>Select a date:</Typography>
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        maxDate={maxDay}
                        minDate={today}
                    />
                </div>
                <FormControl>
                    {renderTimeSlots()}
                </FormControl>
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Button variant="contained" onClick={handleCancel} style={{marginLeft: '10px'}}>Cancel</Button>
                <Button variant="contained" onClick={handleBooking} style={{marginLeft: '10px'}}>Book</Button>
            </div>
            {message &&
                <p className={success? 'successMessage' : 'errmsg'} aria-live='assertive'>{message}</p>}
        </div>
    );
};