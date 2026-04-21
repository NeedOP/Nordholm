package com.eli.nordholm;

import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class NordholmApplication {

    public static void main(String[] args) {
        SpringApplication.run(NordholmApplication.class, args);
    }
    @PostConstruct
    public void debug() {
        System.out.println("=== ENV DEBUG ===");
        System.out.println("jdbc:postgresql://db.dfjsszmwjlbkhlyqpxzo.supabase.co:5432/postgres?sslmode=require: " + System.getenv("SPRING_DATASOURCE_URL"));
        System.out.println("postgres: " + System.getenv("SPRING_DATASOURCE_USERNAME"));
    }

}
