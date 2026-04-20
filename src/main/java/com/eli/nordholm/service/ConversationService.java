package com.eli.nordholm.service;

import com.eli.nordholm.model.Conversation;
import com.eli.nordholm.repository.ConversationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ConversationService {

    private final ConversationRepository conversationRepository;

    public Conversation getOrCreateConversation(Long user1, Long user2) {

        return conversationRepository
                .findByUser1IdAndUser2Id(user1, user2)
                .or(() -> conversationRepository.findByUser2IdAndUser1Id(user1, user2))
                .orElseGet(() -> {

                    Conversation c = new Conversation();
                    c.setUser1Id(user1);
                    c.setUser2Id(user2);
                    c.setCreatedAt(LocalDateTime.now());

                    return conversationRepository.save(c);
                });
    }
}
