package zygar.edu.carhistory.models;

import java.math.BigDecimal;
import java.util.List;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.lang.Nullable;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "car")
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String marka;
    private String model;
    private String rok;
    private String przebieg;
    private String moc;
    private String opis;
    private BigDecimal koszt;
    @OneToMany
    private List<CarNote> carNotes;
    @ManyToOne
    private CarOwner carOwner;

}
