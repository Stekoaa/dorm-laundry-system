package com.example.dormlaundrysystem.damage;

import com.example.dormlaundrysystem.damage.model.Damage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DamageRepository extends JpaRepository<Damage, Long> {
    List<Damage> findAllByOrderByReportTimeDesc();
}
