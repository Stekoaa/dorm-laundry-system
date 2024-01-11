package com.example.dormlaundrysystem.security;

import com.example.dormlaundrysystem.auth.exception.UserBannedException;
import com.example.dormlaundrysystem.user.model.User;
import com.example.dormlaundrysystem.user.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User with username: " + username + " not found"));

        if (user.isBanned()) {
            throw new UserBannedException();
        }
        
        return UserDetailsImpl.build(user);
    }
}
