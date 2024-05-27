package com.example.sistemafacturacionv2.presentation;

import com.example.sistemafacturacionv2.logic.Detalle;
import com.example.sistemafacturacionv2.logic.Factura;
import com.example.sistemafacturacionv2.logic.Proveedor;
import com.example.sistemafacturacionv2.logic.ServiceFactura;
import com.example.sistemafacturacionv2.security.UserDetailsImp;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.property.TextAlignment;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/api/facturas")
public class facturas {
    @Autowired
    ServiceFactura service;

    @GetMapping
    public List<Factura> read(@AuthenticationPrincipal UserDetailsImp user) {
        try {
            List<Factura> lista = service.getFacturasByProveedor(user.getUsername());
            for (Factura factura : lista) {
                String clienteId = factura.getClienteByClientenum().getId();
                Collection<Detalle> det = factura.getDetallesByCodigo();
                factura.setDetallesByCodigo(det);
                factura.setClientenum(Integer.parseInt(clienteId));
                factura.setClienteByClientenum(null);
                factura.setProveedorByProveedoridf(null);
            }
            return lista;
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/detalles/{codigo}")
    public List<Detalle> detalles(@PathVariable String codigo) {
        try {
            int c = Integer.parseInt(codigo);
            Factura factura = service.readFactura(c);
            List<Detalle> lista = (List<Detalle>) factura.getDetallesByCodigo();
            for (Detalle detalle : lista) {
                detalle.setFacturaidd(c);
                detalle.setFacturaByFacturaidd(null);
                detalle.setProductoByProductoidd(null);
            }
            return lista;
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{codigo}/pdf")
    public void pdf(@PathVariable String codigo, HttpServletResponse response) {
        try {
            response.addHeader("Content-Type", "application/pdf");
            int c = Integer.parseInt(codigo);
            Factura factura = service.readFactura(c);
            PdfWriter writter = new PdfWriter(response.getOutputStream());
            PdfDocument pdf = new PdfDocument(writter);
            Document document = new Document(pdf, PageSize.A4);

            // Agregar título
            Paragraph title = new Paragraph("Factura")
                    .setTextAlignment(TextAlignment.CENTER)
                    .setFontSize(20);
            document.add(title);

            // Agregar información de la factura
            Table table = new Table(2);
            table.addCell("Código:");
            table.addCell(Integer.toString(factura.getCodigo()));
            table.addCell("Proveedor:");
            table.addCell(factura.getProveedoridf().toString());
            table.addCell("Cliente:");
            table.addCell((factura.getClienteByClientenum().getNombre()));
            table.addCell("Total:");
            table.addCell(String.valueOf(factura.getTotal()));

            document.add(table);

            document.close();
            pdf.close();
            // Configurar la respuesta HTTP
            response.setContentType("application/pdf");
            response.setHeader("Content-Disposition", "inline; filename=Factura.pdf");

            // Enviar la respuesta
            response.getOutputStream().flush();

        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

//    @GetMapping
//    public Iterable<Factura> read() {
//        Iterable<Factura> lista=service.readAll();
//        for (Factura factura : lista){
//            factura.setClienteByClientenum(null);
//            factura.setProveedorByProveedoridf(null);
//        }
//        return lista;
//    }
}
