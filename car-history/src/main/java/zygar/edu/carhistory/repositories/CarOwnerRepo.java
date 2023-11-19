package zygar.edu.carhistory.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import zygar.edu.carhistory.models.CarOwner;

public interface CarOwnerRepo extends JpaRepository<CarOwner, Long> {
    Optional<CarOwner> findByEmail(String email);
}
