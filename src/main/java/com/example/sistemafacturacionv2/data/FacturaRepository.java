package com.example.sistemafacturacionv2.data;

import com.example.sistemafacturacionv2.logic.Factura;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FacturaRepository extends CrudRepository<Factura, String>{

    @Query("select f from Factura f where f.proveedorByProveedoridf.id = ?1")
    List<Factura> findByProveedor(String idProveedor);
    @Query("select f from Factura f where f.proveedorByProveedoridf.id = ?1 and f.codigo = ?2")
    List<Factura> findByProveedorAndCodigo(String idProveedor, int cod);

    @Query("select f from Factura f where f.codigo = ?1")
    Factura findByCod(int cod);

    @Query("select f from Factura f where f.codigo = (select max(f.codigo) from Factura f)")
    Factura getLast();
}
