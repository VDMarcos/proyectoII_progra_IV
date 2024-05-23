package com.example.sistemafacturacionv2.logic;

import com.example.sistemafacturacionv2.data.ProveedorRepository;
import com.example.sistemafacturacionv2.data.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

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

    public void solicitud(Proveedor proveedor) {
        proveedorRepository.save(proveedor);
    }


      public void createUsuario(Usuario usuario) {
        usuarioRepository.save(usuario);
      }

    public Proveedor readProveedor(String id) {
        return proveedorRepository.findById(id).get();}

    public Iterable<Proveedor> proveedorFindAll() {
        return proveedorRepository.findAll();
    }

    public List<Proveedor> Search(String name){return  proveedorRepository.findByNombreSearch(name);}

    public Usuario readUser(String id){return usuarioRepository.findByUsername(id);}

}
