package com.example.new_project_challenge_15.entity;

import com.example.new_project_challenge_15.entity.enums.Role;
import org.springframework.data.annotation.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Set;

@Node
public class User implements UserDetails {
    @Id
    private String id;
    private String email;
    private String numberPhone;
    private String name;
    private String resume;
    private boolean active;
    private String password;
    private String password2;
    private Set<Role> roles;
    private LocalDateTime dateOfCreated;

    public boolean isAdmin(){
        return roles.contains(Role.ROLE_ADMIN);
    }
    public Set<Role> getRoles() {
        return roles;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setNumberPhone(String numberPhone) {
        this.numberPhone = numberPhone;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setResume(String resume) {
        this.resume = resume;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setPassword2(String password2) {
        this.password2 = password2;
    }

    public void setDateOfCreated(LocalDateTime dateOfCreated) {
        this.dateOfCreated = dateOfCreated;
    }

    public String getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getNumberPhone() {
        return numberPhone;
    }

    public String getName() {
        return name;
    }

    public String getResume() {
        return resume;
    }

    public boolean isActive() {
        return active;
    }

    public String getPassword2() {
        return password2;
    }

    public LocalDateTime getDateOfCreated() {
        return dateOfCreated;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return active;
    }



}
