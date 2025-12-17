package com.suika.bm.exception;

public class BadCredentialsException extends RuntimeException {
  public BadCredentialsException(String message) {
    super(message);
  }
}
