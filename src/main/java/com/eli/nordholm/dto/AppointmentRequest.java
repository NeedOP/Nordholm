package com.eli.nordholm.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

/**
 * Payload sent by a logged-in customer to book an appointment,
 * or by an admin to create one manually on behalf of a customer.
 */
@Data
public class AppointmentRequest {
    private String name;
    private String email;
    private String phone;
    private String description;
    private LocalDate preferredDate;
    private LocalTime preferredTime;
}
