package com.example.sistemafacturacionv2.presentation;

import com.example.sistemafacturacionv2.logic.*;
import com.example.sistemafacturacionv2.security.UserDetailsImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/facturar")
public class Facturar {

    @Autowired
    private ServiceFactura serviceFactura;

    private String idAc;

    @GetMapping("/searchC")
    Cliente getByNameC(@AuthenticationPrincipal UserDetailsImp user, @RequestParam String nombreC) {
        idAc = user.getUsername();
        try {
            Cliente cliente = serviceFactura.getClienteById(idAc, nombreC);
            cliente.setproveedorByProveedoridc2(null);
            return cliente;
        }
        catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/searchP")
    Producto getByNameP(@AuthenticationPrincipal UserDetailsImp user, @RequestParam String nombreC) {
        idAc = user.getUsername();
        try {
            Producto producto = serviceFactura.getProductoByCod(idAc, nombreC);
            producto.setProveedorByProveedoridp(null);
            return producto;
        }
        catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

}

