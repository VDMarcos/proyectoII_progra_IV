package com.example.sistemafacturacionv2.logic;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.Collection;
import java.util.Objects;

@Entity
public class Producto {
   // @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "codigo")
    @NotBlank(message = "El codigo es obligatorio")
    private String codigo;
    @Basic
    @Column(name = "cantidad")
    @NotNull(message = "La cantidad es obligatoria")
    private int cantidad;
    @Basic
    @Column(name = "nombre")
    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;
    @Basic
    @Column(name = "precio")
    @NotNull(message = "El precio es obligatorio")
    private double precio;
    @Basic
    @Column(name = "proveedoridp")
    private String proveedoridp;
    @OneToMany(mappedBy = "productoByProductoidd")
    private Collection<Detalle> detallesByCodigo;
    @ManyToOne
    @JoinColumn(name = "proveedoridp", referencedColumnName = "id", nullable = false, insertable = false, updatable = false)
    private Proveedor proveedorByProveedoridp;

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public String getProveedoridp() {
        return proveedoridp;
    }

    public void setProveedoridp(String proveedoridp) {
        this.proveedoridp = proveedoridp;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Producto producto = (Producto) o;
        return cantidad == producto.cantidad && Double.compare(precio, producto.precio) == 0 && Objects.equals(codigo, producto.codigo) && Objects.equals(nombre, producto.nombre) && Objects.equals(proveedoridp, producto.proveedoridp);
    }

    @Override
    public int hashCode() {
        return Objects.hash(codigo, cantidad, nombre, precio, proveedoridp);
    }

    public Collection<Detalle> getDetallesByCodigo() {
        return detallesByCodigo;
    }

    public void setDetallesByCodigo(Collection<Detalle> detallesByCodigo) {
        this.detallesByCodigo = detallesByCodigo;
    }

    public Proveedor getProveedorByProveedoridp() {
        return proveedorByProveedoridp;
    }

    public void setProveedorByProveedoridp(Proveedor proveedorByProveedoridp) {
        this.proveedorByProveedoridp = proveedorByProveedoridp;
    }
}
