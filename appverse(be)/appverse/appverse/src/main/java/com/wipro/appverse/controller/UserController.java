package com.wipro.appverse.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wipro.appverse.dto.response.UserResponseDTO;
import com.wipro.appverse.service.UserService;


@RestController 
@RequestMapping("/users") 
public class UserController {

    @Autowired
    private UserService userService;
    
    @PreAuthorize("hasRole('ADMIN')")
@PutMapping("/admin/{id}/block")
public String blockUser(@PathVariable Long id) {
    userService.blockUser(id);
    return "User blocked successfully";
}

@PreAuthorize("hasRole('ADMIN')")
@PutMapping("/admin/{id}/unblock")
public String unblockUser(@PathVariable Long id) {
    userService.unblockUser(id);
    return "User unblocked successfully";
}


 // ✅ ADMIN – get all users
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/all")
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {

        List<UserResponseDTO> users = userService.getAllUsers();

        return ResponseEntity.ok(users);
    }

}
