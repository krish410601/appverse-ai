package com.wipro.appverse.service;

import java.util.List;

import com.wipro.appverse.dto.response.UserResponseDTO;

public interface UserService {

    void blockUser(Long userId);

    void unblockUser(Long id);

    List<UserResponseDTO> getAllUsers();
    
}
