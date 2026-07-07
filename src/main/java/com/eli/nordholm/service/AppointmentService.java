package com.eli.nordholm.service;

import com.eli.nordholm.dto.AppointmentRequest;
import com.eli.nordholm.dto.AppointmentResponse;
import com.eli.nordholm.model.Appointment;
import com.eli.nordholm.model.AppointmentStatus;
import com.eli.nordholm.model.User;
import com.eli.nordholm.repository.AppointmentRepository;
import com.eli.nordholm.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final UserRepository userRepository;

    private User findUser(String email) {
        return userRepository.findByEmail(email.trim().toLowerCase())
                .orElseThrow(() -> new RuntimeException("User not found."));
    }

    private void validate(AppointmentRequest req) {
        if (req.getName() == null || req.getName().isBlank()) {
            throw new RuntimeException("Name is required.");
        }
        if (req.getEmail() == null || req.getEmail().isBlank()) {
            throw new RuntimeException("Email is required.");
        }
        if (req.getPreferredDate() == null) {
            throw new RuntimeException("Preferred date is required.");
        }
        if (req.getPreferredTime() == null) {
            throw new RuntimeException("Preferred time is required.");
        }
        if (req.getPreferredDate().isBefore(LocalDate.now())) {
            throw new RuntimeException("Preferred date cannot be in the past.");
        }
    }

    /** Customer books an appointment for their own account. */
    public AppointmentResponse book(String currentUserEmail, AppointmentRequest req) {
        validate(req);

        User user = findUser(currentUserEmail);

        Appointment appointment = new Appointment();
        appointment.setUser(user);
        appointment.setName(req.getName().trim());
        appointment.setEmail(req.getEmail().trim().toLowerCase());
        appointment.setPhone(req.getPhone());
        appointment.setDescription(req.getDescription());
        appointment.setPreferredDate(req.getPreferredDate());
        appointment.setPreferredTime(req.getPreferredTime());
        appointment.setStatus(AppointmentStatus.PENDING);

        return AppointmentResponse.from(appointmentRepository.save(appointment));
    }

    /** All appointments belonging to the given customer, most recent preferred date first. */
    public List<AppointmentResponse> getMyAppointments(String currentUserEmail) {
        User user = findUser(currentUserEmail);
        return appointmentRepository.findByUserOrderByPreferredDateAscPreferredTimeAsc(user)
                .stream()
                .map(AppointmentResponse::from)
                .toList();
    }

    /** Admin: every appointment across all customers. */
    public List<AppointmentResponse> getAll() {
        return appointmentRepository.findAllByOrderByPreferredDateAscPreferredTimeAsc()
                .stream()
                .map(AppointmentResponse::from)
                .toList();
    }

    /** Admin: appointments filtered by status. */
    public List<AppointmentResponse> getByStatus(AppointmentStatus status) {
        return appointmentRepository.findByStatusOrderByPreferredDateAscPreferredTimeAsc(status)
                .stream()
                .map(AppointmentResponse::from)
                .toList();
    }

    /** Admin: manually create an appointment for an existing customer account. */
    public AppointmentResponse createForCustomer(String customerEmail, AppointmentRequest req) {
        validate(req);

        User user = findUser(customerEmail);

        Appointment appointment = new Appointment();
        appointment.setUser(user);
        appointment.setName(req.getName().trim());
        appointment.setEmail(req.getEmail().trim().toLowerCase());
        appointment.setPhone(req.getPhone());
        appointment.setDescription(req.getDescription());
        appointment.setPreferredDate(req.getPreferredDate());
        appointment.setPreferredTime(req.getPreferredTime());
        appointment.setStatus(AppointmentStatus.PENDING);

        return AppointmentResponse.from(appointmentRepository.save(appointment));
    }

    /** Admin: accept / reject / complete an appointment. */
    public AppointmentResponse updateStatus(Long id, AppointmentStatus status) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found."));

        appointment.setStatus(status);
        return AppointmentResponse.from(appointmentRepository.save(appointment));
    }
}
