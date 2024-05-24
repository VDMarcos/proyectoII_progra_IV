package com.example.sistemafacturacionv2.logic;

import com.example.sistemafacturacionv2.data.ClienteRepository;
import com.example.sistemafacturacionv2.data.DetalleRepository;
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
    @Autowired
    private DetalleRepository detalleRepository;

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

    public List<Factura> getFacturasByProveedor(String pro) {
        return facturaRepository.findByProveedor(pro);
    }

    public int getClienteNumById(String pro, String id) {
        return clienteRepository.findByProveedorAndIdentificacion(pro, id).getNumcliente();
    }

    public void addFactura(Factura f){
        facturaRepository.save(f);
    }

    public Factura readFactura(int cod){
        return facturaRepository.findByCod(cod);
    }

    public void addDetalles(List<Detalle> detalles){
        for (Detalle d : detalles){
            int cod = facturaRepository.getLast().getCodigo();
            d.setFacturaidd(cod);
            detalleRepository.save(d);
        }
    }
}

