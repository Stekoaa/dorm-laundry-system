package com.example.dormlaundrysystem.auth;

import com.example.dormlaundrysystem.auth.model.dto.LoginRequestDto;
import com.example.dormlaundrysystem.auth.model.dto.SignupRequestDto;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/v1/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signin")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequestDto loginRequest) {
        ResponseCookie jwtCookie = authService.authenticateUser(loginRequest);
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString()).build();
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupRequestDto signupRequest) {
        authService.createUser(signupRequest);
        return ResponseEntity.ok().build();
    }
}
