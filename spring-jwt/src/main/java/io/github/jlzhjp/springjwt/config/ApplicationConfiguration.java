package io.github.jlzhjp.springjwt.config;


import io.github.jlzhjp.springjwt.user.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@RequiredArgsConstructor
@Configuration
public class ApplicationConfiguration {
    private final AuthorityRepository authorityRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    public ApplicationRunner applicationRunner(UserRepository userRepository) {
        return args -> {
            Authority read = Authority.builder().name("READ").build();
            Authority write = Authority.builder().name("WRITE").build();

            authorityRepository.saveAll(List.of(read, write));

            Role admin = Role.builder().name("ADMIN").build();
            admin.getAuthorities().addAll(List.of(read, write));
            Role user = Role.builder().name("USER").build();
            user.getAuthorities().add(read);

            roleRepository.saveAll(List.of(admin, user));

            User adminUser = User.builder()
                    .email("admin@admin.com")
                    .firstname("admin")
                    .lastname("admin")
                    .role(admin)
                    .password(passwordEncoder.encode("admin"))
                    .build();

            User normalUser = User.builder()
                    .email("user@user.com")
                    .firstname("user")
                    .lastname("user")
                    .role(user)
                    .password(passwordEncoder.encode("user"))
                    .build();

            userRepository.saveAll(List.of(adminUser, normalUser));
        };
    }
}
