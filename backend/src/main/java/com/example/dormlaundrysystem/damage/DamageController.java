package com.example.dormlaundrysystem.damage;

import com.example.dormlaundrysystem.damage.model.dto.DamageDto;
import com.example.dormlaundrysystem.damage.model.dto.DamageReportDto;
import com.example.dormlaundrysystem.washer.model.dto.WasherDto;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/v1/damages")
public class DamageController {
    private final DamageService damageService;

    public DamageController(DamageService damageService) {
        this.damageService = damageService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<DamageDto>> getAllDamages() {
        return ResponseEntity.ok(damageService.getAllDamages());
    }

    @PostMapping("")
    public ResponseEntity<?> addDamage(@Valid @RequestBody DamageReportDto damageReportDto) {
        damageService.createDamage(damageReportDto);
        return ResponseEntity.created(URI.create("")).build();
    }

    @PutMapping("/{damageId}")
    public ResponseEntity<?> updateDamageInfo(
            @PathVariable Long damageId,
            @RequestBody DamageDto damage
    ) {
        damageService.updateDamage(damageId, damage);
        return ResponseEntity.ok().build();
    }
}
