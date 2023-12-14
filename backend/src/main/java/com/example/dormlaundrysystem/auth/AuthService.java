package com.example.dormlaundrysystem.auth;

import com.example.dormlaundrysystem.auth.model.Role;
import com.example.dormlaundrysystem.auth.model.RoleType;
import com.example.dormlaundrysystem.auth.model.User;
import com.example.dormlaundrysystem.auth.exception.UserAlreadyExistsException;
import com.example.dormlaundrysystem.auth.model.dto.LoginRequestDto;
import com.example.dormlaundrysystem.auth.model.dto.SignupRequestDto;
import com.example.dormlaundrysystem.security.UserDetailsImpl;
import com.example.dormlaundrysystem.security.jwt.JwtUtils;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final JwtUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;

    public AuthService(AuthenticationManager authenticationManager, RoleRepository roleRepository, UserRepository userRepository,
                       JwtUtils jwtUtils, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.jwtUtils = jwtUtils;
        this.passwordEncoder = passwordEncoder;
    }

    public ResponseCookie authenticateUser(LoginRequestDto loginRequest) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.username(), loginRequest.password()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        return jwtUtils.generateJwtCookie(userDetails);
    }

    public void createUser(SignupRequestDto signupRequest) {
        if (userRepository.existsByUsername(signupRequest.username())) {
            throw new UserAlreadyExistsException("This username is already taken");
        }

        if (userRepository.existsByEmail(signupRequest.email())) {
            throw new UserAlreadyExistsException("This email is already registered");
        }

        Optional<Role> role = roleRepository.findByName(RoleType.ROLE_USER);
        User user = User.builder()
                .username(signupRequest.username())
                .firstName(signupRequest.firstName())
                .surname(signupRequest.surname())
                .email(signupRequest.email())
                .password(passwordEncoder.encode(signupRequest.password()))
                .roles(Set.of(role.get()))
                .build();

        userRepository.save(user);
    }
}
