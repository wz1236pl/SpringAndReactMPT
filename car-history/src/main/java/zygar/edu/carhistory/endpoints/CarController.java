package zygar.edu.carhistory.endpoints;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import zygar.edu.carhistory.jwt.JwtService;
import zygar.edu.carhistory.models.Car;
import zygar.edu.carhistory.models.CarNote;
import zygar.edu.carhistory.repositories.CarNoteRepo;
import zygar.edu.carhistory.repositories.CarOwnerRepo;
import zygar.edu.carhistory.repositories.CarRepo;
import org.springframework.http.ResponseEntity;

@Slf4j
@RestController
@RequiredArgsConstructor
public class CarController {
    
    private final CarRepo carRepo;
    private final CarNoteRepo carNoteRepo;
    private final JwtService jwtService;
    private final CarOwnerRepo carOwnerRepo;

    @GetMapping("/api/cars{id}")
    public Car getUserCar(@RequestParam Long id) {
        log.info("Get car: {}", id);
        return carRepo.findById(id).get();
    }

    @GetMapping("/api/cars/all")
    public List<Car> getUserCarsByToken(@RequestHeader("Authorization") String token) {
        final String email = jwtService.extractUsername(token.substring(7));
        List<Car> list = carRepo.findAllByCarOwnerEmail(email).stream().sorted(Comparator.comparing(Car::getId)).collect(Collectors.toList());

        return list;
    }

    @PostMapping("/api/cars/add")
    public ResponseEntity<Car> addNewUserCar(@RequestHeader("Authorization") String token, Car newCar) {
        final String email = jwtService.extractUsername(token.substring(7));
        newCar.setCarOwner(carOwnerRepo.findByEmail(email).get());
        newCar.setKoszt(BigDecimal.ZERO);
        carRepo.save(newCar);
        return ResponseEntity.ok().build();
    }
    
    @PutMapping("/api/cars/update")
    public ResponseEntity<Car> updateCar(Car newCar) {
        Car carToUpdate = carRepo.findById(newCar.getId()).get();
        carToUpdate.setMarka(newCar.getMarka());
        carToUpdate.setModel(newCar.getModel());
        carToUpdate.setRok(newCar.getRok());
        carToUpdate.setPrzebieg(newCar.getPrzebieg());
        carToUpdate.setMoc(newCar.getMoc());
        carToUpdate.setOpis(newCar.getOpis());
        carRepo.save(carToUpdate);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/api/carNote/add")
    public ResponseEntity<CarNote> addNewCarNote(@RequestParam Long id, CarNote carNote) {
        Car car = carRepo.findById(id).get();
        car.setPrzebieg(carNote.getPrzebieg());
        car.setKoszt(car.getKoszt().add(carNote.getKoszt()));
        carNote.setCar(car);
        carNoteRepo.save(carNote);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/api/cars/delete")
    public ResponseEntity<Car> deleteCar(@RequestBody Map<String, Long> map) {
        log.info("Delete car: {}", map);
        Long id = map.get("id");
        carNoteRepo.deleteAll(carNoteRepo.findAllByCarId(id));
        carRepo.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/api/carNote/delete")
    public ResponseEntity<CarNote> deleteCarNote(@RequestBody Map<String, Long> map) {
        log.info("Delete car: {}", map);
        Long id = map.get("id");
        CarNote note = carNoteRepo.findById(id).get();
        Car car = note.getCar();
        car.setKoszt(car.getKoszt().subtract(note.getKoszt()));
        carRepo.save(car);
        carNoteRepo.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/api/notes{carId}")
    public List<CarNote> getCarNotes(@RequestParam Long carId) {
        log.info("Get carNotes: {}", carId);
        return carNoteRepo.findAllByCarId(carId);
    }

    @GetMapping("/api/carNote{id}")
    public CarNote getCarNote(@RequestParam Long id) {
        log.info("Get note: {}", id);
        return carNoteRepo.findById(id).get();
    }

    @PutMapping("/api/carNote/update")
    public ResponseEntity<CarNote> updateNote(CarNote newNote) {
        CarNote noteToUpdate = carNoteRepo.findById(newNote.getId()).get();
        Car car = noteToUpdate.getCar();
        car.setPrzebieg(newNote.getPrzebieg());
        BigDecimal wynik = noteToUpdate.getKoszt().subtract(newNote.getKoszt());
        if (wynik.compareTo(BigDecimal.ZERO) == 1) {
            car.setKoszt(noteToUpdate.getKoszt().subtract(wynik));
        }
        if (wynik.compareTo(BigDecimal.ZERO) == -1) {
            car.setKoszt(noteToUpdate.getKoszt().add(wynik));
        }
        noteToUpdate.setKoszt(newNote.getKoszt());
        noteToUpdate.setPrzebieg(newNote.getPrzebieg());
        noteToUpdate.setOpis(newNote.getOpis());
        carNoteRepo.save(noteToUpdate);
        return ResponseEntity.ok().build();
    }

}
