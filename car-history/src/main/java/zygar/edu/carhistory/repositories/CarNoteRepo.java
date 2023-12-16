package zygar.edu.carhistory.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import zygar.edu.carhistory.models.CarNote;

public interface CarNoteRepo extends JpaRepository<CarNote, Long> {

}
