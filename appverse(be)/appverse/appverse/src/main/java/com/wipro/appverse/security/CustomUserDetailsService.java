package com.wipro.appverse.security;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.wipro.appverse.entity.User;
import com.wipro.appverse.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

//     @Override
//     public UserDetails loadUserByUsername(String email)
//             throws UsernameNotFoundException {

//         User user = userRepository.findByEmail(email)
//                 .orElseThrow(() ->
//                         new UsernameNotFoundException("User not found with email: " + email));

//         return org.springframework.security.core.userdetails.User
//                 .withUsername(user.getEmail())
//                 .password(user.getPassword())
//                 .roles(user.getRole().name()) // USER / DEVELOPER / ADMIN
//                 .build();
//     }
        @Override
public UserDetails loadUserByUsername(String email)
        throws UsernameNotFoundException {

    User user = userRepository.findByEmail(email)
            .orElseThrow(() ->
                    new UsernameNotFoundException(
                            "User not found with email: " + email));

    // ✅ BLOCKED USER CHECK
    if (Boolean.FALSE.equals(user.getIsActive())) {
        throw new DisabledException("User account is blocked by admin");
    }

    return org.springframework.security.core.userdetails.User
            .withUsername(user.getEmail())
            .password(user.getPassword())
            .roles(user.getRole().name()) // USER / DEVELOPER / ADMIN
            .build();
}
}

