package io.github.jlzhjp.springjwt;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletResponse;
import lombok.*;

import java.io.IOException;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApiError {
    private long timestamp;
    private String error;
    private String message;

    public static ApiError fromException(Exception e) {
        return ApiError.builder()
                .timestamp(System.currentTimeMillis())
                .error(e.getClass().getName())
                .message(e.getMessage())
                .build();
    }

    public String toJson() throws JsonProcessingException {
        return new ObjectMapper().writeValueAsString(this);
    }

    public void writeToResponse(ServletResponse response) throws IOException {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        response.getWriter().write(toJson());
    }
}
