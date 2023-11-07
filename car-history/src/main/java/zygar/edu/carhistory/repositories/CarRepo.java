package zygar.edu.carhistory.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import zygar.edu.carhistory.models.Car;

public interface CarRepo extends JpaRepository<Car, Long> {
    List<Car> findAll();
    List<Car> findAllByCarOwnerId(Long id);
}
