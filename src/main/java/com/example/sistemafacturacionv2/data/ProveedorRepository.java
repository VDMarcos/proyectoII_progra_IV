package com.example.sistemafacturacionv2.data;

import com.example.sistemafacturacionv2.logic.Proveedor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProveedorRepository extends CrudRepository<Proveedor, String>{
    @Query("select c from Proveedor c where c.id = ?1")
    List<Proveedor> findByIdSearch(String idProveedor);


}
