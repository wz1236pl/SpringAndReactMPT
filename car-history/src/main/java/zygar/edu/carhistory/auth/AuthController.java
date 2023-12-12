package zygar.edu.carhistory.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    
    private final AuthenticationService service;

    @PostMapping(value = "/register")
    public ResponseEntity<AuthenticationResponse> register(RegisterRequest request){
        System.out.println(request);
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticatonRequest request){
        return ResponseEntity.ok(service.authenticate(request));
    }

}
