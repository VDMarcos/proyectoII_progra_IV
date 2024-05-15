package com.example.sistemafacturacionv2.logic;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.util.Collection;
import java.util.Objects;

@Entity
public class Proveedor {
   // @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    @NotBlank(message = "La identificacion es obligatoria")
    private String id;
    @Basic
    @Column(name = "nombre")
    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;
    @Basic
    @Column(name = "correo")
    @NotBlank(message = "El correo es obligatorio")
    private String correo;
    @Basic
    @Column(name = "telefono")
    @NotBlank(message = "El telefono es obligatorio")
    private String telefono;
    @OneToMany(mappedBy = "proveedorByProveedoridc")
    private Collection<Cliente> clientesById;
    @OneToMany(mappedBy = "proveedorByProveedoridf")
    private Collection<Factura> facturasById;
    @OneToMany(mappedBy = "proveedorByProveedoridp")
    private Collection<Producto> productosById;
    @OneToOne
    @JoinColumn(name = "id", referencedColumnName = "id", nullable = false)
    private Usuario usuarioById;
    @Basic
    @Column(name = "estado")
    private boolean estado;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Proveedor proveedor = (Proveedor) o;
        return Objects.equals(id, proveedor.id) && Objects.equals(nombre, proveedor.nombre) && Objects.equals(correo, proveedor.correo) && Objects.equals(telefono, proveedor.telefono);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nombre, correo, telefono);
    }

    public Collection<Cliente> getClientesById() {
        return clientesById;
    }

    public void setClientesById(Collection<Cliente> clientesById) {
        this.clientesById = clientesById;
    }

    public Collection<Factura> getFacturasById() {
        return facturasById;
    }

    public void setFacturasById(Collection<Factura> facturasById) {
        this.facturasById = facturasById;
    }

    public Collection<Producto> getProductosById() {
        return productosById;
    }

    public void setProductosById(Collection<Producto> productosById) {
        this.productosById = productosById;
    }

    public Usuario getUsuarioById() {
        return usuarioById;
    }

    public void setUsuarioById(Usuario usuarioById) {
        this.usuarioById = usuarioById;
    }

    public boolean getEstado() {
        return estado;
    }

    public void setEstado(boolean estado) {
        this.estado = estado;
    }
}
