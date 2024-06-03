
package com.example.project.api.auth;

// com.example.project.api.auth.AuthenticationService
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.project.config.JwtService;
import com.example.project.dao.UserRepository;
import com.example.project.entity.User;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
        private final UserRepository userRepository;
        private final JwtService jwtService;
        private final AuthenticationManager authenticationManager;
        private final PasswordEncoder passwordEncoder; // Dodaj deklarację passwordEncoder

        public AuthenticationResponse authenticate(AuthenticationRequest request) {
                authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

                User user = userRepository.findByEmail(request.getEmail())
                                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

                String token = jwtService.generateToken(user);
                System.out.println(
                                "--------cos: " + user.getUserType());
                return AuthenticationResponse.builder().token(token).userType(user.getUserType()).build();
        }

        public AuthenticationResponse register(RegisterRequest request) {
                User user = User.builder()
                                .userName(request.getUserName())
                                .email(request.getEmail())
                                .password(passwordEncoder.encode(request.getPassword()))
                                .userType(request.getUserType())
                                .build();
                userRepository.save(user);

                String token = jwtService.generateToken(user);
                return AuthenticationResponse.builder().token(token).userType(user.getUserType()).build();
        }
}
