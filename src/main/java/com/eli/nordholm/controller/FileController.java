package com.eli.nordholm.controller;

import com.eli.nordholm.service.SupabaseStorageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@RestController
@RequestMapping("/files")
@CrossOrigin(origins = "*")
public class FileController {

    private final SupabaseStorageService storageService;

    public FileController(SupabaseStorageService storageService) {
        this.storageService = storageService;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {

        try {
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();

            String fileUrl = storageService.uploadFile(
                    file.getBytes(),
                    fileName
            );

            return ResponseEntity.ok(fileUrl);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Upload failed");
        }
    }
}
