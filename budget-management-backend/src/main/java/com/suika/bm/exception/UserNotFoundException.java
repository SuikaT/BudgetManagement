package com.suika.bm.exception;

public class UserNotFoundException extends ResourceNotFoundException {
  public UserNotFoundException(Long userId) {
    super("User not found with id: " + userId);
  }
}
