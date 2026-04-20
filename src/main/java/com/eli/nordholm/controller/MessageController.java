package com.eli.nordholm.controller;

import com.eli.nordholm.model.Message;
import com.eli.nordholm.model.User;
import com.eli.nordholm.repository.UserRepository;
import com.eli.nordholm.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/messages")
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;
    private final UserRepository userRepository;

    // Normal user send (optional)
    @PostMapping
    public Message send(
            @RequestBody Message request,
            Authentication authentication
    ) {
        String email = authentication.getName();

        User sender = userRepository.findByEmail(email)
                .orElseThrow();

        return messageService.sendMessage(
                sender.getId(),
                request.getReceiverId(),
                request.getText(),
                request.getFileUrl()
        );
    }

    //  ADMIN ONLY ENDPOINT
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/admin/send")
    public Message adminSend(
            @RequestBody Message request,
            Authentication authentication
    ) {
        String email = authentication.getName();

        User admin = userRepository.findByEmail(email)
                .orElseThrow();

        return messageService.sendMessage(
                admin.getId(),
                request.getReceiverId(),
                request.getText(),
                request.getFileUrl()
        );
    }
}
