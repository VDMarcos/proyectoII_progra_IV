package com.example.sistemafacturacionv2.presentation;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import com.example.sistemafacturacionv2.logic.Usuario;
import com.example.sistemafacturacionv2.security.UserDetailsImp;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/login")
public class Login {
    @PostMapping("/login")
    public Usuario login(@RequestBody Usuario form, HttpServletRequest request) {
        try {
            //System.out.println(form.getRol());
//            System.out.println(form.getClave());
            request.login(form.getId(), form.getClave());
        } catch (ServletException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
        Authentication auth = (Authentication) request.getUserPrincipal();
        Usuario user = ((UserDetailsImp) auth.getPrincipal()).getUsuario();
        Usuario usuario=new Usuario();
        usuario.setId(user.getId());
        usuario.setClave(null);
        usuario.setRol(user.getRol());
        System.out.println(usuario.getRol());
        return usuario;
    }

    @PostMapping("/logout")
    public void logout(HttpServletRequest request) {
        try {
            request.logout();
        } catch (ServletException e) {
        }
    }

    @GetMapping("/current-user")
    public Usuario getCurrentUsuario(@AuthenticationPrincipal UserDetailsImp user) {
        Usuario usuario=new Usuario();
        usuario.setId(user.getUsername());
        usuario.setClave(null);
        usuario.setRol(user.getUsuario().getRol());
        System.out.println(usuario.getRol());
        return usuario;
    }
}
