package io.github.jlzhjp.springjwt.user;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @GetMapping("/user")
    public UserInfoResponse getUserInfo(@AuthenticationPrincipal User user) {
        return UserInfoResponse.builder()
                .email(user.getEmail())
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .role(user.getRole().getName())
                .authorities(user.getAuthorities().stream()
                        .map(GrantedAuthority::getAuthority)
                        .filter(auth -> !auth.startsWith("ROLE_"))
                        .toList())
                .build();
    }
}
