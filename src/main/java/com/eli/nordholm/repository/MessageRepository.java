package com.eli.nordholm.repository;

import com.eli.nordholm.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

    List<Message> findBySenderIdAndReceiverId(Long senderId, Long receiverId);

    List<Message> findBySenderIdOrReceiverId(Long senderId, Long receiverId);
}
