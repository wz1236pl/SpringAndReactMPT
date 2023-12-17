package zygar.edu.carhistory.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import zygar.edu.carhistory.models.CarNote;

import java.util.List;

public interface CarNoteRepo extends JpaRepository<CarNote, Long> {
    void deleteAllByCarId(Long carId);
    List<CarNote> findAllByCarId(Long carId);
}
