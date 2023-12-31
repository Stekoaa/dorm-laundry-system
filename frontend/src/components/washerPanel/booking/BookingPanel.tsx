import React, {useEffect, useState} from 'react';
import {Button, FormControl, Grid, Select, SelectChangeEvent, Typography} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {getWasherAvailability, makeReservation, SlotsByDay} from '../../../api';
import {useLocation, useNavigate} from 'react-router-dom';
import {AxiosError} from 'axios';

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

    const handleBack = () => navigate('/washers');
    const handleCancel = () => navigate('/washers');

    const bookButtonDisabled = !selectedDate || !selectedTimeSlotId;

    const handleTimeSlotChange = (e: SelectChangeEvent) => {
        const day = selectedDate.toISOString().split('T')[0];
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
                navigate('/myReservations'); // Navigate after a short delay
            }, 3000);
        } catch (err) {
            if (err instanceof AxiosError) {
                if (!err?.response) {
                    setMessage('No response from server');
                } else if (err.response?.status === 409) {
                    setMessage('Another user has just booked this washer');
                    fetchSlots().catch(error => console.error(error));
                } else {
                    setMessage('Error during creating reservation');
                }
            }
        }
    };

    const fetchSlots = async() => {
        const response = await getWasherAvailability(washerId, today, maxDay);
        setSlots(response.data);
    };

    useEffect(() => {
        fetchSlots().catch(console.error);
    }, []);

    const renderTimeSlots = () => {
        const day = selectedDate.toISOString().split('T')[0];
        if (!slots) {
            return <p>Loading...</p>;
        }
        if (!slots[day]) {
            return <p>No slots available for {day}</p>;
        }

        return (
                <Grid item>
                    <Typography>Select a hour:</Typography>
                    <Select value={selectedTimeSlot} onChange={handleTimeSlotChange} style={{ minWidth: '200px', backgroundColor: 'white' }}>
                        {slots[day].map((slot) => (
                            <MenuItem key={slot.id} value={slot.startTime}>
                                {`${slot.startTime} - ${slot.endTime}`}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
        );
    };

    return (
        <div id='bookingPanel' style={{ padding: '20px', width: '100%' }}>
            <Grid container direction='column' alignItems='center' spacing={2}>

                {!success &&(
                    <Grid item style={{ alignSelf: 'flex-start' }}>
                    <ArrowBackIcon style={{ cursor: 'pointer' }} onClick={handleBack} />
                </Grid>)
                }
                {message && (
                    <Grid item style={{width: '100%'}}>
                        <p className={success ? 'successMessage' : 'errmsg'} aria-live='assertive'>{message}</p>
                    </Grid>
                )}
                <Grid item container direction='row' alignItems='center' spacing={2} justifyContent='center'>
                    <Grid item>
                        <Typography>Select a date:</Typography>
                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            maxDate={maxDay}
                            minDate={today}
                            inline
                            fixedHeight
                        />
                    </Grid>
                    <Grid item>
                        <FormControl>
                            {renderTimeSlots()}
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid item container justifyContent='center' spacing={2}>
                    <Grid item>
                        <Button variant='contained' onClick={handleCancel} style={{ backgroundColor: 'red' }}>Cancel</Button>
                    </Grid>
                    <Grid item>
                        <Button variant='contained' onClick={handleBooking} disabled={bookButtonDisabled}>Book</Button>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};
