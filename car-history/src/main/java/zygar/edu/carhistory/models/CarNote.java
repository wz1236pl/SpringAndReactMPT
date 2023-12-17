package zygar.edu.carhistory.models;

import java.math.BigDecimal;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "carNote")
public class CarNote {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String przebieg;
    private String opis;
    private BigDecimal koszt;
    @ManyToOne
    private Car car;
    
}
