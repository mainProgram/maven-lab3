package com.isi.maven.services;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.isi.maven")
@EnableJpaRepositories(basePackages = "com.isi.maven.services.dao")
@EntityScan(basePackages = "com.isi.maven.services.entities")
public class ServicesApplication {
    public static void main(String[] args) {
        SpringApplication.run(ServicesApplication.class, args);
    }
}