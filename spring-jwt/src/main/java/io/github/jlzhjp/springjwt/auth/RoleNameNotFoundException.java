package io.github.jlzhjp.springjwt.auth;

public class RoleNameNotFoundException extends RuntimeException {
    public RoleNameNotFoundException(String message) {
        super(message);
    }
}
