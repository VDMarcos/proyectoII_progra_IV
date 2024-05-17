package com.example.sistemafacturacionv2.logic;

import com.example.sistemafacturacionv2.data.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("ServiceCliente")
public class ServiceCliente {
    @Autowired
    private ClienteRepository clienteRepository;

    public List<Cliente> getClientesByProveedor(String id){
        return clienteRepository.findByProveedor(id);
    }

    public List<Cliente> getClientesByNombre(String id, String nombre){
        if(nombre.equals("")){
            return clienteRepository.findByProveedor(id);
        }
        return clienteRepository.findByProveedorAndNombre(id, nombre);
    }
}
