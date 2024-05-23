package com.example.sistemafacturacionv2.presentation;

import com.example.sistemafacturacionv2.logic.Producto;
import com.example.sistemafacturacionv2.logic.ServiceProductos;
import com.example.sistemafacturacionv2.security.UserDetailsImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
public class productos {
    @Autowired
    ServiceProductos service;

    @GetMapping()
    public List<Producto> read(@AuthenticationPrincipal UserDetailsImp user){

        try{
            List<Producto> lista= service.productosReadAll(user.getUsername());
            for (Producto producto : lista){
                producto.setProveedorByProveedoridp(null);
            }
        return lista;
        }
        catch (Exception ex){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

    }

    @PostMapping
    public void add(@RequestBody Producto producto,@AuthenticationPrincipal UserDetailsImp user){
       producto.setProveedoridp(user.getUsername());
        try{
            service.createProducto(producto);
        }
        catch (Exception ex){
            throw new ResponseStatusException(HttpStatus.CONFLICT);
        }
    }

@GetMapping("/edit/{codigo}")
    public Producto readProducto( @PathVariable String codigo,@AuthenticationPrincipal UserDetailsImp user ){
        try{
            Producto product = service.findProductoByProAndCod(user.getUsername(),codigo);
            return product;
        }
        catch (Exception ex){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
  }

  @GetMapping("/search")
    public List<Producto> search(@RequestParam String nombre, @AuthenticationPrincipal UserDetailsImp user){
      List<Producto> lista=service.productoSearch(user.getUsername(),nombre);
      for (Producto producto : lista){
          producto.setProveedorByProveedoridp(null);
      }
      return lista;

    }

}

