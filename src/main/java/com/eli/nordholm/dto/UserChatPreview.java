package com.eli.nordholm.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserChatPreview {
    private Long userId;
    private String email;
    private String lastMessage;
}
