package com.example.sistemafacturacionv2.logic;

import com.example.sistemafacturacionv2.data.ProveedorRepository;
import com.example.sistemafacturacionv2.data.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;

@org.springframework.stereotype.Service("serviceRegistro")
public class serviceRegistro {
    @Autowired
   private UsuarioRepository usuarioRepository;

    @Autowired
    private ProveedorRepository proveedorRepository;

    public void createProveedor(Proveedor proveedor) {
         proveedor.setEstado(false);
          proveedorRepository.save(proveedor);
    }

      public void createUsuario(Usuario usuario) {
        usuarioRepository.save(usuario);
      }
}
