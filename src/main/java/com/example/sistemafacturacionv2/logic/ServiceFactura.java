package com.example.sistemafacturacionv2.logic;

import com.example.sistemafacturacionv2.data.ClienteRepository;
import com.example.sistemafacturacionv2.data.FacturaRepository;
import com.example.sistemafacturacionv2.data.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("ServiceFactura")
public class ServiceFactura {
    @Autowired
    private ClienteRepository clienteRepository;
    @Autowired
    private ProductoRepository productoRepository;
    @Autowired
    private FacturaRepository facturaRepository;

    public Cliente getClienteById(String pro, String id) {
        return clienteRepository.findByProveedorAndIdentificacion(pro, id);
    }

    public Producto getProductoByCod(String pro, String cod) {
        Producto producto = productoRepository.findByProveedorAndCodigo(pro, cod);
        if (producto != null) {
            producto.setCantidad(producto.getCantidad() - 1);
            productoRepository.save(producto);
            return producto;
        } else {
            return null;
        }
    }

    public Producto getProductoById(String pro, String id) {
        Producto producto = productoRepository.findByProveedorAndCodigo(pro, id);
        if (producto != null) {
            producto.setCantidad(producto.getCantidad() + 1);
            productoRepository.save(producto);
            return producto;
        } else {
            return null;
        }
    }

    public Iterable<Factura> readAll(){return facturaRepository.findAll();}
}

