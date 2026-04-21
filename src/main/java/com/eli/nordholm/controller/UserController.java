package com.eli.nordholm.controller;

import com.eli.nordholm.dto.UserChatPreview;
import com.eli.nordholm.model.User;
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
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserRepository userRepository;
    private final MessageRepository messageRepository;

    @GetMapping
    public List<UserChatPreview> getUsers() {

        String email = UserUtil.getCurrentUserEmail();

        User currentUser = userRepository.findByEmail(email)
                .orElseThrow();

        List<User> users;

        // 🔥 ROLE LOGIC
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

            // 🔥 Get last message between users via conversation
            String lastMessage = messageRepository
                    .findAll()
                    .stream()
                    .filter(m ->
                            (m.getSenderId().equals(currentUser.getId())
                                    || m.getSenderId().equals(user.getId()))
                    )
                    .map(m -> m.getText() != null ? m.getText() : "[file]")
                    .reduce((first, second) -> second)
                    .orElse("No messages yet");

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
