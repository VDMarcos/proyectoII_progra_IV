package com.example.sistemafacturacionv2.data;

import com.example.sistemafacturacionv2.logic.Usuario;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends CrudRepository<Usuario, String>{

}
