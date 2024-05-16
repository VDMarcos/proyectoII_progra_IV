package com.example.sistemafacturacionv2.logic;

import com.example.sistemafacturacionv2.data.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("ServiceCliente")
public class ServiceCliente {
    @Autowired
    ClienteRepository clienteRepository;

    public List<Cliente> getClientesByProveedor(String id){
        return clienteRepository.findByProveedor(id);
    }
}
