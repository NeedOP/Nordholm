package com.eli.nordholm.controller;

import com.eli.nordholm.model.User;
import com.eli.nordholm.repository.UserRepository;
import com.eli.nordholm.security.UserUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserRepository userRepository;

    @GetMapping
    public List<User> getUsers() {

        String email = UserUtil.getCurrentUserEmail();

        User currentUser = userRepository.findByEmail(email)
                .orElseThrow();

        // 🔥 ADMIN → sees all users
        if (currentUser.getRole().equals("ADMIN")) {
            return userRepository.findAll();
        }

        // 🔥 USER → sees only admins
        return userRepository.findByRole("ADMIN");
    }
}
