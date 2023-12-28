package com.example.dormlaundrysystem.washer.exception;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class WasherAdvice extends ResponseEntityExceptionHandler {

    @ExceptionHandler(WasherNotFoundException.class)
    protected ResponseEntity<Object> handleUserNotFoundException(WasherNotFoundException ex, WebRequest request) {
        Map<String, Object> body = new HashMap<>();
        body.put("error", "Not found");
        body.put("message", "Washer not found");
        return handleExceptionInternal(ex, body, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }
}