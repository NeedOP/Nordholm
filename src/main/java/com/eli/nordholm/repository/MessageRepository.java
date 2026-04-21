package com.eli.nordholm.repository;

import com.eli.nordholm.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MessageRepository extends JpaRepository<Message, Long> {

    List<Message> findByConversationId(Long conversationId);

    Optional<Message> findTopByConversationIdOrderByIdDesc(Long conversationId);
}
