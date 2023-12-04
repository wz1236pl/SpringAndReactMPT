package zygar.edu.carhistory.models;

import java.math.BigDecimal;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
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
