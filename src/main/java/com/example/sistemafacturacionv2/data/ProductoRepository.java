package com.example.sistemafacturacionv2.data;

import com.example.sistemafacturacionv2.logic.Producto;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductoRepository extends CrudRepository<Producto, String>{
    @Query("select c from Producto c where c.proveedorByProveedoridp.id = ?1")
    List<Producto> findByProveedor(String idProveedor);

    @Query("select c from Producto c where c.proveedorByProveedoridp.id = ?1 and c.nombre like %?2%")
    List<Producto> findByProveedorAndNombre(String idProveedor, String nombre);

    @Query("select c from Producto c where c.proveedorByProveedoridp.id = ?1 and c.codigo = ?2")
    Producto findByProveedorAndCodigo(String idProveedor, String codigo);

    @Query("select c from Producto c where c.proveedorByProveedoridp.id = ?1 and c.codigo = ?2")
    List<Producto> findByProAndCodigoList(String idProveedor, String codigo);
}
