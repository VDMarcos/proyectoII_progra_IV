package com.example.sistemafacturacionv2.logic;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.util.Collection;
import java.util.Objects;

@Entity
public class Cliente {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "numcliente")
    private int numcliente;
    @Basic
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
    @Basic
    @Column(name = "proveedoridc")
    private String proveedoridc;
    @ManyToOne
    @JoinColumn(name = "proveedoridc", referencedColumnName = "id", nullable = false, insertable = false, updatable = false)
    private Proveedor proveedorByProveedoridc;
    @OneToMany(mappedBy = "clienteByClientenum")
    private Collection<Factura> facturasByNumcliente;

    public int getNumcliente() {
        return numcliente;
    }

    public void setNumcliente(int numcliente) {
        this.numcliente = numcliente;
    }

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

    public String getProveedoridc() {
        return proveedoridc;
    }

    public void setProveedoridc(String proveedoridc) {
        this.proveedoridc = proveedoridc;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Cliente cliente = (Cliente) o;
        return numcliente == cliente.numcliente && Objects.equals(id, cliente.id) && Objects.equals(nombre, cliente.nombre) && Objects.equals(correo, cliente.correo) && Objects.equals(telefono, cliente.telefono) && Objects.equals(proveedoridc, cliente.proveedoridc);
    }

    @Override
    public int hashCode() {
        return Objects.hash(numcliente, id, nombre, correo, telefono, proveedoridc);
    }

    public Proveedor getProveedorByProveedoridc() {
        return proveedorByProveedoridc;
    }

    public void setProveedorByProveedoridc(Proveedor proveedorByProveedoridc) {
        this.proveedorByProveedoridc = proveedorByProveedoridc;
    }

    public Collection<Factura> getFacturasByNumcliente() {
        return facturasByNumcliente;
    }

    public void setFacturasByNumcliente(Collection<Factura> facturasByNumcliente) {
        this.facturasByNumcliente = facturasByNumcliente;
    }
}
