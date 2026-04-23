package com.eli.nordholm.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.text.Normalizer;

@Service
public class SupabaseStorageService {

    private final WebClient webClient;

    @Value("${SUPABASE_URL}")
    private String supabaseUrl;

    @Value("${SUPABASE_SERVICE_KEY}")
    private String serviceKey;

    private final String BUCKET = "uploads";

    public SupabaseStorageService(WebClient webClient) {
        this.webClient = webClient;

        System.out.println("SUPABASE URL = " + supabaseUrl);
        System.out.println("SUPABASE KEY NULL? " + (serviceKey == null));
    }


    public String uploadFile(byte[] fileBytes, String fileName) {

        String cleanFileName = fileName.replace(" ", "_");
        String path = BUCKET + "/" + cleanFileName;

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


    // 🔥 FULL SAFE FILE NAME CLEANER
    private String cleanFileName(String fileName) {

        if (fileName == null) {
            return "file";
        }

        // Step 1: remove accents (å → a, ö → o, etc.)
        String normalized = Normalizer.normalize(fileName, Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "");

        // Step 2: replace everything unsafe with "_"
        return normalized
                .replaceAll("[^a-zA-Z0-9._-]", "_")
                .toLowerCase();
    }
}
