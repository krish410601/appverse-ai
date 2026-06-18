package com.wipro.appverse.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.wipro.appverse.dto.response.UserResponseDTO;
import com.wipro.appverse.entity.User;
import com.wipro.appverse.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Override
public void blockUser(Long userId) {
    log.info("blockUser service method called");

    User user = userRepository.findById(userId)
            .orElseThrow(() ->
                    new ResponseStatusException(
                            HttpStatus.NOT_FOUND, "User not found"));

    user.setIsActive(false);
    userRepository.save(user);
}

@Override
public void unblockUser(Long userId) {
    log.info("unblockUser service method called");

    User user = userRepository.findById(userId)
            .orElseThrow(() ->
                    new ResponseStatusException(
                            HttpStatus.NOT_FOUND, "User not found"));

    user.setIsActive(true);
    userRepository.save(user);
}

@Override
public List<UserResponseDTO> getAllUsers() {
    log.info("getAllUsers service method called");

    List<User> users = userRepository.findAll();

    return users.stream()
            .map(this::mapToDTO)
            .toList();
}

private UserResponseDTO mapToDTO(User user) {

    UserResponseDTO dto = new UserResponseDTO();

    dto.setId(user.getId());
    dto.setFullName(user.getFullName());
    dto.setEmail(user.getEmail());
    dto.setRole(user.getRole().name());
    dto.setIsActive(user.getIsActive());
    dto.setCreatedAt(user.getCreatedAt().toString());

    return dto;
}
}
