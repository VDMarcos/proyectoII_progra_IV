package com.example.sistemafacturacionv2.presentation;

import com.example.sistemafacturacionv2.logic.Producto;
import com.example.sistemafacturacionv2.logic.Proveedor;
import com.example.sistemafacturacionv2.logic.Usuario;
import com.example.sistemafacturacionv2.logic.serviceRegistro;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/registro")
public class registro {
    @Autowired
    serviceRegistro service;

    @PostMapping
    public void add(@RequestBody Usuario user){
        var encoder = new BCryptPasswordEncoder();
        user.setClave("{bcrypt}"+encoder.encode(user.getClave()));
        user.setRol("");
        try{
            service.createUsuario(user);
        }
        catch (Exception ex){
            throw new ResponseStatusException(HttpStatus.CONFLICT);
        }
    }

    @PostMapping("/proveedor")
    public void addP(@RequestBody Proveedor proveedor){
        proveedor.setEstado(false);
        try{
            service.createProveedor(proveedor);
        }
        catch (Exception ex){
            throw new ResponseStatusException(HttpStatus.CONFLICT);
        }
    }

}
