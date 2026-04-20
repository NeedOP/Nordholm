package com.eli.nordholm.service;

import com.eli.nordholm.model.Message;
import com.eli.nordholm.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;

    public Message sendMessage(Long senderId, Long receiverId, String text, String fileUrl) {

        Message message = new Message();
        message.setSenderId(senderId);
        message.setReceiverId(receiverId);
        message.setText(text);
        message.setFileUrl(fileUrl);
        message.setCreatedAt(LocalDateTime.now());

        return messageRepository.save(message);
    }

    public List<Message> getConversation(Long user1, Long user2) {
        return messageRepository.findBySenderIdAndReceiverId(user1, user2);
    }
}
