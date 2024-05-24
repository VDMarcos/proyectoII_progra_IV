package com.example.sistemafacturacionv2.presentation;

import com.example.sistemafacturacionv2.logic.Factura;
import com.example.sistemafacturacionv2.logic.Proveedor;
import com.example.sistemafacturacionv2.logic.ServiceFactura;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/facturas")
public class facturas {
    @Autowired
    ServiceFactura service;

    @GetMapping
    public Iterable<Factura> read() {
        Iterable<Factura> lista=service.readAll();
        for (Factura factura : lista){
            factura.setClienteByClientenum(null);
            factura.setProveedorByProveedoridf(null);
        }
        return lista;
    }
}
