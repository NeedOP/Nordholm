package com.eli.nordholm.dto;

import com.eli.nordholm.model.AppointmentStatus;
import lombok.Data;

@Data
public class AppointmentStatusUpdateRequest {
    private AppointmentStatus status;
}
