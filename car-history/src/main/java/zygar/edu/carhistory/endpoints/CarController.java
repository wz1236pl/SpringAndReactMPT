package zygar.edu.carhistory.endpoints;

import java.util.List;

import lombok.RequiredArgsConstructor;
import zygar.edu.carhistory.models.Car;
import zygar.edu.carhistory.repositories.CarRepo;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;


@Controller
@RequiredArgsConstructor
public class CarController {
    
    private final CarRepo carRepo;

    @GetMapping("/api/cars/all")
    public List<Car> getCars() {
        return carRepo.findAll();
    }

    @GetMapping("/api/cars/{id}")
    public List<Car> getUserCars(@PathVariable Long id) {
        return carRepo.findAllByCarOwnerId(id);
    }

    @PostMapping("/api/cars/add")
    public ResponseEntity<Car> addNewUserCar(@RequestBody Car newCar) {
        carRepo.save(newCar);
        return ResponseEntity.ok().build();
    }
    
    @PutMapping("/api/cars/update")
    public ResponseEntity<Car> updateCar(@RequestBody Car newCar) {
        carRepo.save(newCar);
        return ResponseEntity.ok().build();
    }

}
