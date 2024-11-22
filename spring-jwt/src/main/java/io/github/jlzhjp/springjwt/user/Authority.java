package io.github.jlzhjp.springjwt.user;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
public class Authority {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
}
