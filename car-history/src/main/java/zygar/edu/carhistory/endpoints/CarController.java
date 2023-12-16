package zygar.edu.carhistory.endpoints;

import java.math.BigDecimal;
import java.util.List;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import zygar.edu.carhistory.jwt.JwtService;
import zygar.edu.carhistory.models.Car;
import zygar.edu.carhistory.models.CarNote;
import zygar.edu.carhistory.models.CarOwner;
import zygar.edu.carhistory.repositories.CarNoteRepo;
import zygar.edu.carhistory.repositories.CarOwnerRepo;
import zygar.edu.carhistory.repositories.CarRepo;
import org.springframework.http.ResponseEntity;

@RestController
@RequiredArgsConstructor
public class CarController {
    
    private final CarRepo carRepo;
    private final CarNoteRepo carNoteRepo;
    private final JwtService jwtService;
    private final CarOwnerRepo carOwnerRepo;

    @GetMapping("/api/cars/{id}")
    public List<Car> getUserCars(Long id) {
        return carRepo.findAllByCarOwnerId(id);
    }

    @GetMapping("/api/cars/all")
    public List<Car> getUserCarsByToken(@RequestHeader("Authorization") String token) {
        final String email = jwtService.extractUsername(token.substring(7));
        System.out.print("email: "+email);
        return carRepo.findAllByCarOwnerEmail(email);
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
        carRepo.save(newCar);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/api/carNote/add")
    public ResponseEntity<CarNote> addNewCarNote(CarNote carNote) {

        carNoteRepo.save(carNote);
        return ResponseEntity.ok().build();
    }


}
