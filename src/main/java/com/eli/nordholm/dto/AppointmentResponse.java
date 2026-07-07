package com.eli.nordholm.dto;

import com.eli.nordholm.model.Appointment;
import com.eli.nordholm.model.AppointmentStatus;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

/**
 * Safe, flattened view of an Appointment returned to the frontend.
 * Avoids serializing the full User entity (password hash, etc.).
 */
@Data
public class AppointmentResponse {
    private Long id;
    private Long userId;
    private String name;
    private String email;
    private String phone;
    private String description;
    private LocalDate preferredDate;
    private LocalTime preferredTime;
    private AppointmentStatus status;
    private LocalDateTime createdAt;

    public static AppointmentResponse from(Appointment a) {
        AppointmentResponse dto = new AppointmentResponse();
        dto.setId(a.getId());
        dto.setUserId(a.getUser() != null ? a.getUser().getId() : null);
        dto.setName(a.getName());
        dto.setEmail(a.getEmail());
        dto.setPhone(a.getPhone());
        dto.setDescription(a.getDescription());
        dto.setPreferredDate(a.getPreferredDate());
        dto.setPreferredTime(a.getPreferredTime());
        dto.setStatus(a.getStatus());
        dto.setCreatedAt(a.getCreatedAt());
        return dto;
    }
}
