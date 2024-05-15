package com.example.sistemafacturacionv2.data;

import com.example.sistemafacturacionv2.logic.Usuario;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends CrudRepository<Usuario, String>{
    @Query("select u from Usuario u where u.id = ?1")
    Usuario findByUsername(String id);
}
