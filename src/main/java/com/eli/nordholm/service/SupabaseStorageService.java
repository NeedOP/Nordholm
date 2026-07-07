package com.eli.nordholm.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.text.Normalizer;

/**
 * Optional file storage (kept for future use — e.g. attaching documents
 * to an appointment). Not wired into any endpoint yet.
 */
@Service
public class SupabaseStorageService {

    private final WebClient webClient;

    @Value("${SUPABASE_URL:}")
    private String supabaseUrl;

    @Value("${SUPABASE_SERVICE_KEY:}")
    private String serviceKey;

    private static final String BUCKET = "uploads";

    public SupabaseStorageService(WebClient webClient) {
        this.webClient = webClient;
    }

    public String uploadFile(byte[] fileBytes, String fileName) {

        String path = BUCKET + "/" + cleanFileName(fileName);

        webClient.put()
                .uri(supabaseUrl + "/storage/v1/object/" + path)
                .header("Authorization", "Bearer " + serviceKey)
                .header("apikey", serviceKey)
                .header("Content-Type", "application/octet-stream")
                .bodyValue(fileBytes)
                .retrieve()
                .toBodilessEntity()
                .block();

        return supabaseUrl + "/storage/v1/object/public/" + path;
    }

    private String cleanFileName(String fileName) {
        if (fileName == null) {
            return "file";
        }

        String normalized = Normalizer.normalize(fileName, Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "");

        return normalized
                .replaceAll("[^a-zA-Z0-9._-]", "_")
                .toLowerCase();
    }
}
