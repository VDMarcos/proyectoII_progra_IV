package com.example.sistemafacturacionv2.presentation;

import com.example.sistemafacturacionv2.logic.Producto;
import com.example.sistemafacturacionv2.logic.ServiceProductos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
public class productos {
    @Autowired
    ServiceProductos service;
    String idc;
    @GetMapping("/{proveedor}")
    public List<Producto> read(@PathVariable String proveedor){
        idc=proveedor;
        try{
            List<Producto> lista= service.productosReadAll(proveedor);
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
    public void add(@RequestBody Producto producto){
       producto.setProveedoridp(idc);
        try{
            service.createProducto(producto);
        }
        catch (Exception ex){
            throw new ResponseStatusException(HttpStatus.CONFLICT);
        }
    }

@GetMapping("/edit/{codigo}")
    public Producto readProducto( @PathVariable String codigo){
        try{
            Producto product = service.findProductoByProAndCod(idc,codigo);
            return product;
        }
        catch (Exception ex){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
  }

  @GetMapping("/search")
    public List<Producto> search(@RequestParam String nombre){
      List<Producto> lista=service.productoSearch(idc,nombre);
      for (Producto producto : lista){
          producto.setProveedorByProveedoridp(null);
      }
      return lista;

    }

}

