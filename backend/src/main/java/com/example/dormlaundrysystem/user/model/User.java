package com.example.dormlaundrysystem.user.model;

import com.example.dormlaundrysystem.auth.model.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users",
		uniqueConstraints = {
				@UniqueConstraint(columnNames = "username"),
				@UniqueConstraint(columnNames = "email")
		})
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull(message = "Username cannot be null")
	@Pattern(regexp = "^[a-zA-Z0-9_\\-]{3,20}$", message = "Invalid username")
	private String username;

	@NotNull(message = "First name cannot be null")
	@Pattern(regexp = "^[\\p{L}'-]+$", message = "Invalid first name")
	private String firstName;

	@NotNull(message = "Surname cannot be null")
	@Pattern(regexp =  "^[\\p{L}'\\- ]+$", message = "Invalid surname")
	private String surname;

	@NotNull(message = "Email cannot be null")
	@Email(regexp = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$", message = "Invalid email")
	private String email;

	@NotNull(message = "Password cannot be null")
	@Size(min = 8, max = 120, message = "Invalid password")
	private String password;

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "user_roles",
			joinColumns = @JoinColumn(name = "user_id"),
			inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<>();

	private boolean banned;

	public User() {}

	public User(String username, String firstName, String surname, String email, String password, boolean banned) {
		this.username = username;
		this.firstName = firstName;
		this.surname = surname;
		this.email = email;
		this.password = password;
		this.banned = banned;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public boolean isBanned() {
		return banned;
	}

	public void setBanned(boolean banned) {
		this.banned = banned;
	}

	public static Builder builder() {
		return new Builder();
	}

	public static class Builder {
		private Long id;
		private String username;
		private String firstName;
		private String surname;
		private String email;
		private String password;
		private Set<Role> roles = new HashSet<>();
		private boolean banned;

		public Builder id(Long id) {
			this.id = id;
			return this;
		}

		public Builder firstName(String firstName) {
			this.firstName = firstName;
			return this;
		}

		public Builder surname(String surname) {
			this.surname = surname;
			return this;
		}

		public Builder username(String username) {
			this.username = username;
			return this;
		}

		public Builder email(String email) {
			this.email = email;
			return this;
		}

		public Builder password(String password) {
			this.password = password;
			return this;
		}

		public Builder roles(Set<Role> roles) {
			this.roles = roles;
			return this;
		}

		public Builder banned(boolean banned) {
			this.banned = banned;
			return this;
		}

		public User build() {
			User user = new User();
			user.setId(id);
			user.setUsername(username);
			user.setFirstName(firstName);
			user.setSurname(surname);
			user.setEmail(email);
			user.setPassword(password);
			user.setRoles(roles);
			user.setBanned(banned);
			return user;
		}
	}
}
