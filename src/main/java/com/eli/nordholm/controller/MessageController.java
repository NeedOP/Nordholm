package com.eli.nordholm.controller;

import com.eli.nordholm.model.Conversation;
import com.eli.nordholm.model.Message;
import com.eli.nordholm.model.User;
import com.eli.nordholm.repository.UserRepository;
import com.eli.nordholm.security.UserUtil;
import com.eli.nordholm.service.ConversationService;
import com.eli.nordholm.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/messages")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5174")
public class MessageController {

    private final MessageService messageService;
    private final ConversationService conversationService;
    private final UserRepository userRepository;

    // ✅ SEND MESSAGE (FIXED)
    @PostMapping("/send/{receiverId}")
    public Message send(
            @PathVariable Long receiverId,
            @RequestBody Message request
    ) {
        String email = UserUtil.getCurrentUserEmail();

        User sender = userRepository.findByEmail(email)
                .orElseThrow();

        Conversation conversation = conversationService
                .getOrCreateConversation(sender.getId(), receiverId);

        return messageService.sendMessage(
                conversation.getId(),
                sender.getId(),
                request.getText(),
                request.getFileUrl()
        );
    }

    // ✅ GET MESSAGES
    @GetMapping("/conversation/{conversationId}")
    public List<Message> getConversation(@PathVariable Long conversationId) {
        return messageService.getMessages(conversationId);
    }
}
