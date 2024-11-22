package io.github.jlzhjp.springjwt.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserInfoResponse {
    private String firstname;
    private String lastname;
    private String email;
    private String role;
    private List<String> authorities;
}
