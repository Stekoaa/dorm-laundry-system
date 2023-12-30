package com.example.dormlaundrysystem.booking.exception;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.Map;

@ControllerAdvice
public class BookingAdvice extends ResponseEntityExceptionHandler {

    @ExceptionHandler(TimeSlotNotFoundException.class)
    protected ResponseEntity<Object> handleUserNotFoundException(TimeSlotNotFoundException ex, WebRequest request) {
        Map<String, String> body = createResponseBody("Not found", "Time slot not found");
        return handleExceptionInternal(ex, body, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }

    @ExceptionHandler(ReservationNotFoundException.class)
    protected ResponseEntity<Object> handleReservationNotFoundException(ReservationNotFoundException ex, WebRequest request) {
        Map<String, String> body = createResponseBody("Not found", "Reservation not found");
        return handleExceptionInternal(ex, body, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }

    private Map<String, String> createResponseBody(String error, String message) {
        return Map.of("error", error, "message", message);
    }
}