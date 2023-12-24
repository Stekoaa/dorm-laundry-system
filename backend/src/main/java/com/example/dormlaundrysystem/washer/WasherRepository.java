package com.example.dormlaundrysystem.washer;

import com.example.dormlaundrysystem.washer.model.Washer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WasherRepository extends JpaRepository<Washer, Long> {
    // Add custom query methods if needed
}
