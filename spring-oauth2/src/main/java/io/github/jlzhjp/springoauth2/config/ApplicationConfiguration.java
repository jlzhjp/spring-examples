package io.github.jlzhjp.springoauth2.config;

import io.github.jlzhjp.springoauth2.User;
import io.github.jlzhjp.springoauth2.data.UserRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;

@Configuration
public class ApplicationConfiguration {
    @Bean
    public ApplicationRunner applicationRunner(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        return args -> {
            userRepository.save(User.builder()
                    .email("mail@gmail.com")
                    .password(passwordEncoder.encode("password"))
                    .givenName("Alice")
                    .familyName("Carteret")
                    .middleName("Mike")
                    .gender("female")
                    .birthdate(LocalDate.of(2003, 1, 30))
                    .role("ROLE_USER")
                    .build());
        };
    }
}
