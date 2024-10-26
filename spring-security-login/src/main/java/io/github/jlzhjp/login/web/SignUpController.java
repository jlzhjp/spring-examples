package io.github.jlzhjp.login.web;

import io.github.jlzhjp.login.SignUpForm;
import io.github.jlzhjp.login.data.UserRepository;
import jakarta.validation.Valid;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/signup")
public class SignUpController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public SignUpController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping
    public String signUp(Model model) {
        model.addAttribute("userForm", new SignUpForm());
        return "signup";
    }

    @PostMapping
    public String processSubmission(
            @Valid
            @ModelAttribute("userForm")
            SignUpForm form,
            BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return "signup";
        }
        userRepository.save(form.toUser(passwordEncoder));
        return "redirect:/login";
    }
}
