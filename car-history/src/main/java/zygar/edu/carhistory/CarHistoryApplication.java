package zygar.edu.carhistory;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition
public class CarHistoryApplication {

	public static void main(String[] args) {
		SpringApplication.run(CarHistoryApplication.class, args);
	}

}
