package com.eli.nordholm.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class EmailService {

    private final WebClient webClient = WebClient.builder().build();

    @Value("${RESEND_API_KEY}")
    private String apiKey;

    @Value("${RESEND_FROM_ADDRESS:onboarding@resend.dev}")
    private String fromAddress;

    public void sendEmail(String to, String subject, String html) {

        webClient.post()
                .uri("https://api.resend.com/emails")
                .header("Authorization", "Bearer " + apiKey)
                .header("Content-Type", "application/json")
                .bodyValue("""
                    {
                      "from": "%s",
                      "to": "%s",
                      "subject": "%s",
                      "html": "%s"
                    }
                """.formatted(fromAddress, to, escape(subject), escape(html)))
                .retrieve()
                .toBodilessEntity()
                .block();
    }

    // Prevents broken JSON if a subject/body ever contains a quote or newline.
    private String escape(String raw) {
        if (raw == null) return "";
        return raw.replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\n", "");
    }
}
