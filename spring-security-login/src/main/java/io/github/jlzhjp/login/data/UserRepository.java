package io.github.jlzhjp.login.data;

import io.github.jlzhjp.login.CustomUser;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<CustomUser, Long> {
    CustomUser findByUsername(String username);
}
