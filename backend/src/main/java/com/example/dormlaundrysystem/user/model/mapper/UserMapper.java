package com.example.dormlaundrysystem.user.model.mapper;

import com.example.dormlaundrysystem.user.model.User;
import com.example.dormlaundrysystem.user.model.dto.UserDto;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public static UserDto toDto(User user) {
        return new UserDto(
                user.getUsername(),
                user.getFirstName(),
                user.getSurname(),
                user.getEmail(),
                user.isBanned()
        );
    }
}
