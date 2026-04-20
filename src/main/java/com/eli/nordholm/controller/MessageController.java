package com.eli.nordholm.controller;

import com.eli.nordholm.model.Message;
import com.eli.nordholm.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/messages")
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;

    @PostMapping
    public Message send(@RequestBody Message request) {
        return messageService.sendMessage(
                request.getSenderId(),
                request.getReceiverId(),
                request.getText(),
                request.getFileUrl()
        );
    }

    @GetMapping("/{user1}/{user2}")
    public List<Message> getConversation(
            @PathVariable Long user1,
            @PathVariable Long user2
    ) {
        return messageService.getConversation(user1, user2);
    }
}
