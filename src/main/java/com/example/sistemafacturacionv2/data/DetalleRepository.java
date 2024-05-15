package com.example.sistemafacturacionv2.data;

import com.example.sistemafacturacionv2.logic.Detalle;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DetalleRepository extends CrudRepository<Detalle, String>{
}
