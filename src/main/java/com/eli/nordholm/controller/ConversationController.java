package com.eli.nordholm.controller;

import com.eli.nordholm.model.Conversation;
import com.eli.nordholm.model.User;
import com.eli.nordholm.repository.UserRepository;
import com.eli.nordholm.security.UserUtil;
import com.eli.nordholm.service.ConversationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/conversations")
@RequiredArgsConstructor

public class ConversationController {

    private final ConversationService conversationService;
    private final UserRepository userRepository;

    @GetMapping("/with/{userId}")
    public Conversation getConversation(@PathVariable Long userId) {

        String email = UserUtil.getCurrentUserEmail();

        User currentUser = userRepository.findByEmail(email)
                .orElseThrow();

        return conversationService.getOrCreateConversation(
                currentUser.getId(),
                userId
        );
    }
}
