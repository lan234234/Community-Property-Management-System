package com.laioffer.communitymanagement;

import com.laioffer.communitymanagement.authAndRegister.UserAlreadyExistException;
import com.laioffer.communitymanagement.authAndRegister.UserNotExistException;
import com.laioffer.communitymanagement.changePassword.InvalidOldPasswordException;
import com.laioffer.communitymanagement.exception.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalControllerExceptionHandler {

    @ExceptionHandler(UserAlreadyExistException.class)
    public final ResponseEntity<String> handleUserAlreadyExistExceptions(Exception ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(UserNotExistException.class)
    public final ResponseEntity<String> handleUserNotExistExceptions(Exception ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(InvalidOldPasswordException.class)
    public final ResponseEntity<String> handleInvalidOldPasswordException(InvalidOldPasswordException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(IssueNotExistException.class)
    public final ResponseEntity<String> handleIssueNotExistExceptions(Exception ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(IssueAlreadyConfirmedException.class)
    public final ResponseEntity<String> handleIssueAlreadyConfirmedExceptions(Exception ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(IssueAlreadyClosedException.class)
    public final ResponseEntity<String> handleIssueAlreadyClosedExceptions(Exception ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(IssueNotConfirmedException.class)
    public final ResponseEntity<String> handleIssueNotConfirmedExceptions(Exception ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(AmazonS3UploadException.class)
    public final ResponseEntity<String> handleAmazonS3UploadExceptions(Exception ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
