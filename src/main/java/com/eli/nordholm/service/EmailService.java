package com.eli.nordholm.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class EmailService {

    private final WebClient webClient = WebClient.builder().build();

    @Value("${RESEND_API_KEY}")
    private String apiKey;

    public void sendEmail(String to, String subject, String html) {

        webClient.post()
                .uri("https://api.resend.com/emails")
                .header("Authorization", "Bearer " + apiKey)
                .header("Content-Type", "application/json")
                .bodyValue("""
                    {
                      "from": "onboarding@resend.dev",
                      "to": "%s",
                      "subject": "%s",
                      "html": "%s"
                    }
                """.formatted(to, subject, html))
                .retrieve()
                .toBodilessEntity()
                .block();
    }
}
