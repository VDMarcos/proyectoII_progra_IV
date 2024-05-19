package com.example.sistemafacturacionv2.logic;

import com.example.sistemafacturacionv2.data.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@org.springframework.stereotype.Service("serviceProductos")
public class ServiceProductos {
    @Autowired
 private ProductoRepository productoRepository;

    @Autowired
    private ProveedorRepository proveedorRepository;
    public Iterable<Producto> productoFindAll() {
        return productoRepository.findAll();
    }

    public Producto findProductoByProAndCod(String pro, String cod){
        return productoRepository.findByProveedorAndCodigo(pro, cod);
    }

    public void createProducto(Producto producto) {
        productoRepository.save(producto);
    }

    public List<Producto> productosReadAll(String idProveedor) {
       return productoRepository.findByProveedor(idProveedor);
    }

    public void updateCantidadProducto(String id){
        Producto p = productoRepository.findById(id).get();
        p.setCantidad(p.getCantidad()-1);
        productoRepository.save(p);
    }

    public void updateCantidadProducto2(String id){
        Producto p = productoRepository.findById(id).get();
        p.setCantidad(p.getCantidad()+1);
        productoRepository.save(p);
    }

    public List<Producto> productoSearch(String idProveedor, String name) {
        return productoRepository.findByProveedorAndNombre(idProveedor, name);
    }

    public Proveedor readProveedor(String id) {
       return proveedorRepository.findById(id).get();
  }
}
