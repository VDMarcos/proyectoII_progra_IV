package com.example.sistemafacturacionv2.logic;

import com.example.sistemafacturacionv2.data.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("ServiceCliente")
public class ServiceCliente {
    @Autowired
    private ClienteRepository clienteRepository;

    public List<Cliente> getClientesByProveedor(String id) {
        return clienteRepository.findByProveedor(id);
    }

    public List<Cliente> getClientesByNombre(String id, String nombre) {
        if (nombre.equals("")) {
            return clienteRepository.findByProveedor(id);
        }
        return clienteRepository.findByProveedorAndNombre(id, nombre);
    }

    public void addCliente(Cliente cliente) {
        if (clienteRepository.findByProveedorAndIdentificacion(cliente.getProveedoridc(), cliente.getId()) != null) {
            clienteRepository.delete(clienteRepository.findByProveedorAndIdentificacion(cliente.getProveedoridc(), cliente.getId()));
        }
        clienteRepository.save(cliente);
    }

    public Cliente getClienteById(String pro, String id) {
        return clienteRepository.findByProveedorAndIdentificacion(
                pro,id);
    }
}
