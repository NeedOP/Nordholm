package com.eli.nordholm.repository;

import com.eli.nordholm.model.Appointment;
import com.eli.nordholm.model.AppointmentStatus;
import com.eli.nordholm.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    List<Appointment> findByUserOrderByPreferredDateAscPreferredTimeAsc(User user);

    List<Appointment> findAllByOrderByPreferredDateAscPreferredTimeAsc();

    List<Appointment> findByStatusOrderByPreferredDateAscPreferredTimeAsc(AppointmentStatus status);
}
