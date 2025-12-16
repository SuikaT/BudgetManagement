package com.suika.bm.interceptor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.suika.bm.database.service.UserService;
import com.suika.bm.model.network.User;
import com.suika.bm.service.AuthService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AuthInterceptor implements HandlerInterceptor {

    private static final Logger LOGGER = LoggerFactory.getLogger(AuthInterceptor.class);

    private final UserService userService;

    private final AuthService authService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {

        String header = request.getHeader("Authorization");

        if (header == null || !header.startsWith("Bearer ")) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return false;
        }

        String token = header.substring(7);

        if (!authService.isValidToken(token)) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return false;
        }

        try {
            Long userId = authService.getUserId(token);

            if (userId == null) {
                throw new Exception("No userId in token");
            }

            User user = userService.getUserById(userId);

            request.setAttribute("user", user);
        } catch (Exception e) {
            // Log but don't expose details
            LOGGER.warn("Auth failure for path: {}", request.getRequestURI(), e);
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

            return false;
        }

        return true;
    }
}
