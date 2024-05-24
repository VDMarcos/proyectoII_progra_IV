package com.example.sistemafacturacionv2.presentation;

import com.example.sistemafacturacionv2.logic.Proveedor;
import com.example.sistemafacturacionv2.logic.serviceRegistro;
import com.example.sistemafacturacionv2.security.UserDetailsImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/usuario")
public class usuario {
    @Autowired
    serviceRegistro service;

    @GetMapping()
    public Proveedor read(@AuthenticationPrincipal UserDetailsImp user){
        try{
            Proveedor proveedor=service.readProveedor(user.getUsername());
            return proveedor;
        }
        catch (Exception ex){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping()
    public void addP(@RequestBody Proveedor proveedor){
        try{
            proveedor.setEstado(true);
            service.solicitud(proveedor);
        }
        catch (Exception ex){
            throw new ResponseStatusException(HttpStatus.CONFLICT);
        }
    }
}
