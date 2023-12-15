package com.example.dormlaundrysystem.auth.model;

import jakarta.persistence.*;

@Entity
@Table(name = "roles")
public class Role {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Enumerated(EnumType.STRING)
	@Column(length = 30)
	private RoleType name;

	public Role() {}

	public Role(RoleType name) {
		this.name = name;
	}

	public RoleType getName() {
		return name;
	}

	public void setName(RoleType name) {
		this.name = name;
	}
}
