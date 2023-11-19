package zygar.edu.carhistory.auth;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import zygar.edu.carhistory.jwt.JwtService;
import zygar.edu.carhistory.models.CarOwner;
import zygar.edu.carhistory.repositories.CarOwnerRepo;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final CarOwnerRepo carOwnerRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    
    public AuthenticationResponse register(RegisterRequest request) {
        if(carOwnerRepo.findByEmail(request.getEmail()).isPresent()){
             return AuthenticationResponse.builder().token(null).build();
        }
        var carOwner = CarOwner.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();
            carOwnerRepo.save(carOwner);
            var jwtToken = jwtService.generateToken(carOwner);
            return AuthenticationResponse.builder().token(jwtToken).build();
    }

    public AuthenticationResponse authenticate(AuthenticatonRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        CarOwner carOwner = carOwnerRepo.findByEmail(request.getEmail()).orElseThrow();
        if (!passwordEncoder.matches(request.getPassword(), carOwner.getPassword())){
            return null;
        }
        var jwtToken = jwtService.generateToken((UserDetails) carOwner);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }
    
}
