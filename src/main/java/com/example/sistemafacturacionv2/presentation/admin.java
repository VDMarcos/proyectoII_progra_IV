package com.example.sistemafacturacionv2.presentation;

import com.example.sistemafacturacionv2.logic.Producto;
import com.example.sistemafacturacionv2.logic.Proveedor;
import com.example.sistemafacturacionv2.logic.Usuario;
import com.example.sistemafacturacionv2.logic.serviceRegistro;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class admin {
    @Autowired
    serviceRegistro service;

    @GetMapping
    public Iterable<Proveedor> read() {
        Iterable<Proveedor> lista=service.proveedorFindAll();
        for (Proveedor proveedor : lista){
            proveedor.setUsuarioById(null);
        }
        return lista;
    }

    @GetMapping("/aprove/{id}")
    public void aprove(@PathVariable String id){
        Proveedor proveedor=service.readProveedor(id);
        Usuario user= service.readUser(id);

        user.setRol("PRO");
        proveedor.setEstado(true);
        try{
            service.solicitud(proveedor);
        }
        catch (Exception ex){
            throw new ResponseStatusException(HttpStatus.CONFLICT);
        }
    }

    @GetMapping("/reject/{id}")
    public void reject(@PathVariable String id){
        Proveedor proveedor=service.readProveedor(id);
        Usuario user= service.readUser(id);

        user.setRol("");
        proveedor.setEstado(false);
        try{
            service.solicitud(proveedor);
        }
        catch (Exception ex){
            throw new ResponseStatusException(HttpStatus.CONFLICT);
        }
    }

    @GetMapping("/search")
    public List<Proveedor> search(@RequestParam String nombre){
        List<Proveedor> lista=service.Search(nombre);
        for (Proveedor proveedor : lista){
            proveedor.setUsuarioById(null);
        }
        return lista;

    }


}
