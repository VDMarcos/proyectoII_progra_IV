package com.example.sistemafacturacionv2.logic;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;

import java.util.Collection;
import java.util.Objects;

@JsonInclude(value = JsonInclude.Include.CUSTOM, valueFilter = LazyFieldsFilter.class)
@Entity
public class Factura {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "codigo")
    private int codigo;
    @Basic
    @Column(name = "proveedoridf")
    private String proveedoridf;
    @Basic
    @Column(name = "clientenum")
    private int clientenum;
    @Basic
    @Column(name = "total")
    private double total;
    @OneToMany(mappedBy = "facturaByFacturaidd")
    private Collection<Detalle> detallesByCodigo;
    @ManyToOne
    @JoinColumn(name = "proveedoridf", referencedColumnName = "id", nullable = false, insertable = false, updatable = false)
    private Proveedor proveedorByProveedoridf;
    @ManyToOne
    @JoinColumn(name = "clientenum", referencedColumnName = "numcliente", nullable = false, insertable = false, updatable = false)
    private Cliente clienteByClientenum;

    public int getCodigo() {
        return codigo;
    }

    public void setCodigo(int codigo) {
        this.codigo = codigo;
    }

    public String getProveedoridf() {
        return proveedoridf;
    }

    public void setProveedoridf(String proveedoridf) {
        this.proveedoridf = proveedoridf;
    }

    public int getClientenum() {
        return clientenum;
    }

    public void setClientenum(int clientenum) {
        this.clientenum = clientenum;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Factura factura = (Factura) o;
        return codigo == factura.codigo && clientenum == factura.clientenum && Double.compare(total, factura.total) == 0 && Objects.equals(proveedoridf, factura.proveedoridf);
    }

    @Override
    public int hashCode() {
        return Objects.hash(codigo, proveedoridf, clientenum, total);
    }

    public Collection<Detalle> getDetallesByCodigo() {
        return detallesByCodigo;
    }

    public void setDetallesByCodigo(Collection<Detalle> detallesByCodigo) {
        this.detallesByCodigo = detallesByCodigo;
    }

    public Proveedor getProveedorByProveedoridf() {
        return proveedorByProveedoridf;
    }

    public void setProveedorByProveedoridf(Proveedor proveedorByProveedoridf) {
        this.proveedorByProveedoridf = proveedorByProveedoridf;
    }

    public void total(){
        double total = 0;
        for(Detalle d : detallesByCodigo){
            total += d.getMonto();
        }
        this.total = total;
    }

    public Cliente getClienteByClientenum() {
        return clienteByClientenum;
    }

    public void setClienteByClientenum(Cliente clienteByClientenum) {
        this.clienteByClientenum = clienteByClientenum;
    }
}
