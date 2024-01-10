package com.example.dormlaundrysystem.user;

import com.example.dormlaundrysystem.user.model.dto.UserDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PutMapping("/{username}/ban")
    public ResponseEntity<?> banUser(@PathVariable String username) {
        userService.banUser(username);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{username}/unban")
    public ResponseEntity<?> unbanUser(@PathVariable String username) {
        userService.unbanUser(username);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{username}")
    public ResponseEntity<?> deleteUser(@PathVariable String username) {
        userService.deleteUser(username);
        return ResponseEntity.noContent().build();
    }
}
