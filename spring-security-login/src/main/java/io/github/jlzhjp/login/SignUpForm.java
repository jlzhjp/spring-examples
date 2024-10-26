package io.github.jlzhjp.login;

import io.github.jlzhjp.login.validation.ValidPassword;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

@Data
@NoArgsConstructor
public class SignUpForm {
    @NotNull
    @NotEmpty
    @Size(min = 2, max = 12)
    private String username;

    @NotNull
    @NotEmpty
    @Size(min = 6, max = 18)
    @ValidPassword
    private String password;

    @NotNull
    @NotEmpty
    private String firstName;

    @NotNull
    @NotEmpty
    private String lastName;

    @NotNull
    @NotEmpty
    @Pattern(regexp = "^[+]?[0-9]{10,13}$", message = "Must be a valid phone number")
    private String phoneNumber;

    public CustomUser toUser(PasswordEncoder encoder) {
        return new CustomUser(username, encoder.encode(password), firstName, lastName, phoneNumber);
    }
}
