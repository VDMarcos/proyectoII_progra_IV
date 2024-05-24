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

    private List<Producto> productos;

    @GetMapping("/searchC")
    Cliente getByNameC(@AuthenticationPrincipal UserDetailsImp user, @RequestParam String nombreC) {
        try {
            Cliente cliente = serviceFactura.getClienteById(user.getUsername(), nombreC);
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
            if(producto.getCantidad() == 0){
                throw new ResponseStatusException(HttpStatus.NOT_FOUND);
            }
            return producto;
        }
        catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/get/{id}")
    Producto getById(@AuthenticationPrincipal UserDetailsImp user, @PathVariable String id) {
        try {
            Producto producto = serviceFactura.getProductoById(user.getUsername(), id);
            producto.setProveedorByProveedoridp(null);
            return producto;
        }
        catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/addF")
    void addFactura(@AuthenticationPrincipal UserDetailsImp user, @RequestBody Factura factura, @RequestParam String cl) {
        try {
            factura.setProveedoridf(user.getUsername());
            int cli = serviceFactura.getClienteNumById(factura.getProveedoridf(), cl);
            factura.setClientenum(cli);
            System.out.println(factura.getProveedoridf());
            System.out.println(factura.getClientenum());
            serviceFactura.addFactura(factura);
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.CONFLICT);
        }
    }

    @PostMapping("/addD")
    void addFactura(@AuthenticationPrincipal UserDetailsImp user, @RequestBody List<Detalle> detalles) {
        try {
            System.out.println(detalles);
            for(Detalle d : detalles) {
                String c= String.valueOf(d.getCodigo());
                System.out.println(c);
                d.setProductoidd(c);
            }
            serviceFactura.addDetalles(detalles);
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.CONFLICT);
        }
    }

}

