package io.github.jlzhjp.springoauth2;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// http://localhost:8080/oauth2/authorize?response_type=code&client_id=test-client&scope=openid&redirect_uri=http://spring.io/auth&code_challenge=XalXuVBmNKAj_ELJZ28HScH1FROttVhCvHDuBkB_GM8&code_challenge_method=S256
@SpringBootApplication
public class SpringOauth2Application {

    public static void main(String[] args) {
        SpringApplication.run(SpringOauth2Application.class, args);
    }

}
