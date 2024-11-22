package io.github.jlzhjp.springjwt.web;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.atomic.AtomicReference;

@RestController
public class NoticeController {
    private final AtomicReference<String> notice = new AtomicReference<>("");

    @PreAuthorize("hasAuthority('READ')")
    @GetMapping("/notice")
    public String notice() {
        return notice.get();
    }

    @PreAuthorize("hasAuthority('WRITE')")
    @PostMapping("/notice")
    public void updateNotice(@RequestBody String content) {
        notice.set(content);
    }
}
