package com.example.sistemafacturacionv2.logic;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
public class Detalle {
    //NO METER EN EL FORMS
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "codigo")
    private int codigo;
    @Basic
    @Column(name = "facturaidd")
    private int facturaidd;
    @Basic
    @Column(name = "productoidd")
    private String productoidd;
    @Basic
    @Column(name = "cantidad")
    private int cantidad;
    @Basic
    @Column(name = "monto")
    private double monto;
    @ManyToOne
    @JoinColumn(name = "facturaidd", referencedColumnName = "codigo", nullable = false, insertable = false, updatable = false)
    private Factura facturaByFacturaidd;
    @ManyToOne
    @JoinColumn(name = "productoidd", referencedColumnName = "codigo", nullable = false, insertable = false, updatable = false)
    private Producto productoByProductoidd;

    public int getCodigo() {
        return codigo;
    }

    public void setCodigo(int codigo) {
        this.codigo = codigo;
    }

    public int getFacturaidd() {
        return facturaidd;
    }

    public void setFacturaidd(int facturaidd) {
        this.facturaidd = facturaidd;
    }

    public String getProductoidd() {
        return productoidd;
    }

    public void setProductoidd(String productoidd) {
        this.productoidd = productoidd;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public double getMonto() {
        return monto;
    }

    public void setMonto(double monto) {
        this.monto = monto;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Detalle detalle = (Detalle) o;
        return codigo == detalle.codigo && facturaidd == detalle.facturaidd && cantidad == detalle.cantidad && Double.compare(monto, detalle.monto) == 0 && Objects.equals(productoidd, detalle.productoidd);
    }

    @Override
    public int hashCode() {
        return Objects.hash(codigo, facturaidd, productoidd, cantidad, monto);
    }

    public Factura getFacturaByFacturaidd() {
        return facturaByFacturaidd;
    }

    public void setFacturaByFacturaidd(Factura facturaByFacturaidd) {
        this.facturaByFacturaidd = facturaByFacturaidd;
    }

    public Producto getProductoByProductoidd() {
        return productoByProductoidd;
    }

    public void setProductoByProductoidd(Producto productoByProductoidd) {
        this.productoByProductoidd = productoByProductoidd;
    }

    public void monto(){
        this.monto = this.cantidad * this.productoByProductoidd.getPrecio();
    }
}
