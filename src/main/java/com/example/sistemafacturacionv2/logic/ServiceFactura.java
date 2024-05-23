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
        return productoRepository.findByProveedorAndCodigo(pro, cod);
    }
}
