package io.github.jlzhjp.springmybatistodo;

import lombok.Data;

@Data
public class Todo {
    private Long id;

    private String title;

    private Boolean completed;
}
