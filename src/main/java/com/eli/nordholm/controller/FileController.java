package com.eli.nordholm.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping("/files")
@CrossOrigin
public class FileController {

    private final String uploadDir = System.getProperty("user.dir") + "/uploads/";

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {

        try {
            File dir = new File(uploadDir);

            if (!dir.exists()) {
                dir.mkdirs(); // 🔥 creates folder automatically
            }

            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            File destination = new File(uploadDir + fileName);

            file.transferTo(destination);

            return ResponseEntity.ok(fileName);

        } catch (IOException e) {
            e.printStackTrace(); // 🔥 VERY IMPORTANT for debugging
            return ResponseEntity.internalServerError().body("Upload failed");
        }
    }
}
