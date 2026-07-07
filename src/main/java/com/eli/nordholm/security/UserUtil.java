package com.eli.nordholm.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class UserUtil {

    /** Email of the currently authenticated user (JWT subject), or null if none. */
    public static String getCurrentUserEmail() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth != null ? auth.getName() : null;
    }
}
