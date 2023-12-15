package com.example.dormlaundrysystem.auth;

import com.example.dormlaundrysystem.auth.model.Role;
import com.example.dormlaundrysystem.auth.model.RoleType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleType name);
}
