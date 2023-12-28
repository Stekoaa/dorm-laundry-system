package com.example.dormlaundrysystem.auth.model.mapper;

import com.example.dormlaundrysystem.auth.model.User;
import com.example.dormlaundrysystem.auth.model.dto.UserDto;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public static UserDto toDto(User user) {
        return new UserDto(
                user.getUsername(),
                user.getFirstName(),
                user.getSurname()
        );
    }
}
