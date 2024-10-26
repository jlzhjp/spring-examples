package io.github.jlzhjp.login.web;

import jakarta.servlet.http.HttpSession;
import org.springframework.security.web.WebAttributes;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Map;

@Controller
@RequestMapping("login")
public class LoginController {
    @GetMapping
    public String login(
            @RequestParam
            Map<String, String> params,
            HttpSession session,
            Model model) {
        if (params.containsKey("error")) {
            AuthenticationException ex = (AuthenticationException)session.getAttribute(WebAttributes.AUTHENTICATION_EXCEPTION);
            if (ex != null) {
                model.addAttribute("error", ex.getMessage());
            }
        }
        return "login";
    }
}
