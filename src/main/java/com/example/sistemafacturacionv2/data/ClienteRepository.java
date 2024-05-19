package com.example.sistemafacturacionv2.data;

import com.example.sistemafacturacionv2.logic.Cliente;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClienteRepository extends CrudRepository<Cliente, Integer>{

    @Query("select c from Cliente c where c.proveedorByProveedoridc.id = ?1")
    List<Cliente> findByProveedor(String idProveedor);

    @Query("select c from Cliente c where c.proveedorByProveedoridc.id = ?1 and c.nombre like %?2%")
    List<Cliente> findByProveedorAndNombre(String idProveedor, String nombre);


    @Query("select c from Cliente c where c.proveedorByProveedoridc.id = ?1 and c.id = ?2")
    Cliente findByProveedorAndIdentificacion(String idProveedor, String nombre);

    @Query("select c from Cliente c where c.proveedorByProveedoridc.id = ?1 and c.numcliente = ?2")
    Cliente findByProveedorAndNumCliente(String idProveedor, int numCliente);

    @Query("select c from Cliente c where c.proveedorByProveedoridc.id = ?1 and c.nombre = ?2")
    Cliente findByProAndNom(String id, String nom);

    @Query("select c from Cliente c where c.id = ?1")
    Cliente findfById(String id);
}
