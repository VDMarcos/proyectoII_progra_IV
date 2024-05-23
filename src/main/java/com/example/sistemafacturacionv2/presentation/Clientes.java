package com.example.sistemafacturacionv2.presentation;

import com.example.sistemafacturacionv2.logic.Cliente;
import com.example.sistemafacturacionv2.security.UserDetailsImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import com.example.sistemafacturacionv2.logic.ServiceCliente;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
public class Clientes {

    @Autowired
    private ServiceCliente serviceCliente;

    private String idAc;

    @GetMapping("/get")
    List<Cliente> getAll(@AuthenticationPrincipal UserDetailsImp user) {
        idAc = user.getUsername();
        try {
            List<Cliente> clientes = serviceCliente.getClientesByProveedor(idAc);
            for (Cliente cliente : clientes) {
                cliente.setproveedorByProveedoridc2(null);
                System.out.println(cliente.getId());
                System.out.println(cliente.getNombre());
                System.out.println(cliente.getCorreo());
                System.out.println(cliente.getTelefono());
            }
            return clientes;
        }
        catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/search")
    List<Cliente> getByName(@RequestParam String nombre) {
        List<Cliente> clientes = serviceCliente.getClientesByNombre(idAc, nombre);
        for (Cliente cliente : clientes) {
            cliente.setproveedorByProveedoridc2(null);
        }
        return clientes;
    }

    @PostMapping("/add")
    void addCliente(@RequestBody Cliente cliente) {
        try {
            //cliente.setProveedoridc(idAc);
            serviceCliente.addCliente(cliente);
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.CONFLICT);
        }
    }

    @GetMapping("/get/{id}")
    Cliente getCliente(@PathVariable String id) {
        Cliente cliente = serviceCliente.getClienteById(idAc, id);
        cliente.setproveedorByProveedoridc2(null);
        return cliente;
    }
}
