package com.example.sistemafacturacionv2.logic;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.util.Objects;

@JsonInclude(value = JsonInclude.Include.CUSTOM, valueFilter = LazyFieldsFilter.class)
@Entity
public class Usuario {
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    @NotBlank(message = "La identificacion es obligatoria")
    private String id;
    @Basic
    @Column(name = "clave")
    @NotBlank(message = "La clave es obligatoria")
    private String clave;
    @Basic
    @Column(name = "rol")
    private String rol;
    @OneToOne(mappedBy = "usuarioById")
    private Proveedor proveedorById;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getClave() {
        return clave;
    }

    public void setClave(String clave) {
        this.clave = clave;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Usuario usuario = (Usuario) o;
        return Objects.equals(id, usuario.id) && Objects.equals(clave, usuario.clave) && Objects.equals(rol, usuario.rol);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, clave, rol);
    }

    public Proveedor getProveedorById() {
        return proveedorById;
    }

    public void setProveedorById(Proveedor proveedorById) {
        this.proveedorById = proveedorById;
    }
}
