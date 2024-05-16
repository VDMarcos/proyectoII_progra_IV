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

    @GetMapping("/{id}")
    List<Cliente> getAll(@PathVariable String id) {
        return serviceCliente.getClientesByProveedor(id);
    }


}
