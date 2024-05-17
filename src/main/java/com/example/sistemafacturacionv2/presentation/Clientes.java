package com.example.sistemafacturacionv2.presentation;

import com.example.sistemafacturacionv2.logic.Cliente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.sistemafacturacionv2.logic.ServiceCliente;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
public class Clientes {

    @Autowired
    private ServiceCliente serviceCliente;

    private String idAc;

    @GetMapping("/{id}")
    List<Cliente> getAll(@PathVariable String id) {
        idAc = id;
        List<Cliente> clientes = serviceCliente.getClientesByProveedor(id);
        for(Cliente cliente : clientes){
            cliente.setproveedorByProveedoridc2(null);
        }
        return clientes;
    }

    @GetMapping("/search")
    List<Cliente> getByName(@RequestParam String nombre) {
        List<Cliente> clientes = serviceCliente.getClientesByNombre(idAc, nombre);
        for(Cliente cliente : clientes){
            cliente.setproveedorByProveedoridc2(null);
        }
        return clientes;
    }

}
