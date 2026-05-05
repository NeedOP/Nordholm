package com.eli.nordholm.controller;

import com.eli.nordholm.dto.UserChatPreview;
import com.eli.nordholm.model.Conversation;
import com.eli.nordholm.model.Message;
import com.eli.nordholm.model.User;
import com.eli.nordholm.repository.ConversationRepository;
import com.eli.nordholm.repository.MessageRepository;
import com.eli.nordholm.repository.UserRepository;
import com.eli.nordholm.security.UserUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final MessageRepository messageRepository;
    private final ConversationRepository conversationRepository;

    @GetMapping
    public List<UserChatPreview> getUsers() {

        String email = UserUtil.getCurrentUserEmail();

        User currentUser = userRepository.findByEmail(email)
                .orElseThrow();

        List<User> users;

        //  ROLE LOGIC
        if (currentUser.getRole().equals("ADMIN")) {
            users = userRepository.findAll();
        } else {
            // normal user only sees admins
            users = userRepository.findByRole("ADMIN");
        }

        List<UserChatPreview> result = new ArrayList<>();

        for (User user : users) {


            if (user.getId().equals(currentUser.getId())) {
                continue;
            }

            // GET CONVERSATION BETWEEN USERS
            Conversation conversation = conversationRepository
                    .findByUser1IdAndUser2Id(currentUser.getId(), user.getId())
                    .or(() -> conversationRepository
                            .findByUser1IdAndUser2Id(user.getId(), currentUser.getId()))
                    .orElse(null);

            String lastMessage = "No messages yet";

            // GET LAST MESSAGE ONLY FROM THIS CONVERSATION
            if (conversation != null) {
                lastMessage = messageRepository
                        .findByConversationId(conversation.getId())
                        .stream()
                        .reduce((first, second) -> second)
                        .map(m -> m.getText() != null ? m.getText() : "[file]")
                        .orElse("No messages yet");
            }

            result.add(
                    new UserChatPreview(
                            user.getId(),
                            user.getEmail(),
                            lastMessage
                    )
            );
        }

        return result;
    }
}
