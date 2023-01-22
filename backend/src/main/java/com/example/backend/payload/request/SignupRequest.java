package com.example.backend.payload.request;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Set;

@Data
public class SignupRequest {
    @NotBlank
    @Size(min = 5, max = 15)
    private String username;

    @NotBlank
    private String password;

    @Email
    @NotBlank
    @Size(max = 50)
    private String email;

    private String phoneNumber;

    private Set<String> role;

}