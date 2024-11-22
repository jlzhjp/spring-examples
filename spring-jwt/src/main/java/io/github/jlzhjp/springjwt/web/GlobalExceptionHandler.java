package io.github.jlzhjp.springjwt.web;

import com.fasterxml.jackson.core.JsonProcessingException;
import io.github.jlzhjp.springjwt.ApiError;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.io.IOException;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public void handleException(HttpServletResponse response, Exception ex) throws IOException {
        var error = ApiError.fromException(ex);
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        response.getWriter().write(error.toJson());
    }
}
