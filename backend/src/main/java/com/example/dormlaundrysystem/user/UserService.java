package com.example.dormlaundrysystem.user;

import com.example.dormlaundrysystem.user.exception.UserNotFoundException;
import com.example.dormlaundrysystem.user.model.User;
import com.example.dormlaundrysystem.user.model.dto.UserDto;
import com.example.dormlaundrysystem.user.model.mapper.UserMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream().map(UserMapper::toDto).toList();
    }

    public void banUser(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(UserNotFoundException::new);

        user.setBanned(true);
        userRepository.save(user);
    }

    public void unbanUser(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(UserNotFoundException::new);

        user.setBanned(false);
        userRepository.save(user);
    }

    public void deleteUser(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(UserNotFoundException::new);
        userRepository.delete(user);
    }
}
