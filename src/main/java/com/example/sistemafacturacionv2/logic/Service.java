//package com.example.sistemafacturacionv2.logic;
//
//import org.example.sistemafacturacion.data.*;
//import org.springframework.beans.factory.annotation.Autowired;
//
//import java.util.List;
//
//@org.springframework.stereotype.Service("service")
//public class Service {
//    @Autowired
//    private ClienteRepository clienteRepository;
//    @Autowired
//    private UsuarioRepository usuarioRepository;
//    @Autowired
//    private ProveedorRepository proveedorRepository;
//    @Autowired
//    private DetalleRepository detalleRepository;
//    @Autowired
//    private FacturaRepository facturaRepository;
//    @Autowired
//    private ProductoRepository productoRepository;
//
//    public Iterable<Cliente> clienteFindAll() {
//        return clienteRepository.findAll();
//    }
//
//    public Iterable<Producto> productoFindAll() {
//        return productoRepository.findAll();
//    }
//
//    public Iterable<Usuario> usuarioFindAll() {
//        return usuarioRepository.findAll();
//    }
//
//    public Iterable<Proveedor> proveedorFindAll() {
//        return proveedorRepository.findAll();
//    }
//
//    public void createUsuario(Usuario usuario) {
//
//        usuarioRepository.save(usuario);
//
//    }
//
//    public void createCliente(Cliente cliente) {
//        if (clienteRepository.findByProveedorAndIdentificacion(cliente.getProveedoridc(), cliente.getId()) != null) {
//            clienteRepository.delete(clienteRepository.findByProveedorAndIdentificacion(cliente.getProveedoridc(), cliente.getId()));
//        }
//        clienteRepository.save(cliente);
//    }
//
//    public Producto findProductoByProAndCod(String pro, String cod){
//        return productoRepository.findByProveedorAndCodigo(pro, cod);
//    }
//
//    public Cliente findClienteByProAndId(String pro, String id){
//        return clienteRepository.findByProveedorAndIdentificacion(pro, id);
//    }
//
//    public void createProducto(Producto producto) {
//        productoRepository.save(producto);
//    }
//
//    public Proveedor readProveedor(String id) {
//        return proveedorRepository.findById(id).get();
//    }
//
//    public void createProveedor(Proveedor proveedor) {
//        proveedor.setEstado(false);
//        proveedorRepository.save(proveedor);
//    }
//
//    public List<Cliente> clienteReadAll(String idProveedor) {
//        return clienteRepository.findByProveedor(idProveedor);
//    }
//
//    public List<Factura> facturaReadAll(String idProveedor) {
//        return facturaRepository.findByProveedor(idProveedor);
//    }
//
//    public Usuario readUsuario(String id) {
//        if (usuarioRepository.findById(id).isEmpty()) {
//            return null;
//        }
//        return usuarioRepository.findById(id).get();
//    }
//
//    public List<Proveedor> proveedorId(String id) {
//        return proveedorRepository.findByIdSearch(id);
//    }
//
//    public List<Producto> productosReadAll(String idProveedor) {
//        return productoRepository.findByProveedor(idProveedor);
//    }
//
//    public Factura facturaRead(int cod) {
//        return facturaRepository.findByCod(cod);
//    }
//
//    public List<Factura> facturaSearch(String idProveedor, int cod) {
//        return facturaRepository.findByProveedorAndCodigo(idProveedor, cod);
//    }
//
//    public List<Cliente> clienteSearch(String idProveedor, String nombre) {
//        return clienteRepository.findByProveedorAndNombre(idProveedor, nombre);
//
//    }
//
//    public void updateCantidadProducto(String id){
//        Producto p = productoRepository.findById(id).get();
//        p.setCantidad(p.getCantidad()-1);
//        productoRepository.save(p);
//    }
//
//    public void updateCantidadProducto2(String id){
//        Producto p = productoRepository.findById(id).get();
//        p.setCantidad(p.getCantidad()+1);
//        productoRepository.save(p);
//    }
//
//    public Cliente findClienteByProAndNombre(String pro, String nom){
//        return clienteRepository.findByProAndNom(pro, nom);
//    }
//
//    public List<Producto> productoSearch(String idProveedor, String name) {
//        return productoRepository.findByProveedorAndNombre(idProveedor, name);
//    }
//
//    public void facturaCreate(Factura factura) {
//        List<Detalle> d = (List<Detalle>) factura.getDetallesByCodigo();
//        facturaRepository.save(factura);
//        Factura f = facturaRepository.getLast();
//        for(Detalle detalle : d){
//            detalle.setFacturaByFacturaidd(f);
//            detalle.setFacturaidd(f.getCodigo());
//            detalleRepository.save(detalle);
//        }
//    }
//
//    public void verificarCliente(Cliente cliente) {  //preguntar a profe si esta bien implementado
//        if (clienteRepository.findByProveedorAndIdentificacion(cliente.getProveedoridc(), cliente.getId()) != null) {
//            clienteRepository.delete(clienteRepository.findByProveedorAndIdentificacion(cliente.getProveedoridc(), cliente.getId()));
//        }
//        if (clienteRepository.findByProveedorAndIdentificacion(cliente.getProveedoridc(), cliente.getId()) == null) {
//            clienteRepository.save(cliente);
//        }
//    }
//
//    public void ActivaProveedor(Proveedor proveedor) {
//        if (proveedorRepository.findById(proveedor.getId()).get() != null) {
//            proveedorRepository.findById(proveedor.getId()).get().setEstado(true);
//            proveedorRepository.save(proveedorRepository.findById(proveedor.getId()).get());
//        }
//
//    }
//
//    public void rechazaProveedor(Proveedor proveedor) {
//        if (proveedorRepository.findById(proveedor.getId()).get() != null) {
//            proveedorRepository.findById(proveedor.getId()).get().setEstado(false);
//            proveedorRepository.save(proveedorRepository.findById(proveedor.getId()).get());
//        }
//
//    }
//
//    public void proveedorEdit(Proveedor proveedor) {
//        if (proveedorRepository.findById(proveedor.getId()).get() != null) {
//
//            proveedorRepository.findById(proveedor.getId()).get().setCorreo(proveedor.getCorreo());
//            proveedorRepository.findById(proveedor.getId()).get().setNombre(proveedor.getNombre());
//            proveedorRepository.findById(proveedor.getId()).get().setTelefono(proveedor.getTelefono());
//
//            proveedorRepository.save(proveedorRepository.findById(proveedor.getId()).get());
//        }
//    }
//
//    public void verificarProducto(Producto producto) {  //preguntar a profe si esta bien implementado
//        if (productoRepository.findByProveedorAndCodigo(producto.getProveedoridp(), producto.getCodigo()) != null) {
//            productoRepository.delete(productoRepository.findByProveedorAndCodigo(producto.getProveedoridp(), producto.getCodigo()));
//        }
//        productoRepository.save(producto);
//    }
//
//}
