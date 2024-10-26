package io.github.jlzhjp.login;

import io.github.jlzhjp.login.data.UserRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class ApplicationConfig {
    @Bean
    ApplicationRunner applicationRunner(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            userRepository.save(new CustomUser(
                    "jsmith",
                    passwordEncoder.encode("abc123"),
                    "John",
                    "Smith",
                    "12345678900"
            ));
        };
    }
}
