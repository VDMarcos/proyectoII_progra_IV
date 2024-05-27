CREATE DATABASE SistemaFacturacion;

USE SistemaFacturacion;

create table Usuario(
id varchar(30) not null,
clave varchar(500) not null,
rol varchar(10) not null,  -- admin/proveedor...
constraint pku Primary key(id)
);

create table Proveedor (
  id varchar(30) not null,
  nombre varchar(30) not null,
  correo varchar(50) not null,
  telefono varchar(15) not null,
  constraint pkp Primary key(id),
  constraint fkp foreign key (id) references Usuario(id)
);

create table Cliente (
  numcliente int not null auto_increment,
  id varchar(30) not null,
  nombre varchar(30) not null,
  correo varchar(50) not null,
  telefono varchar(15) not null,
  proveedoridc varchar(30) not null, -- para relacionar cliente-proovedor
  constraint pkc Primary key(numcliente),  
  constraint fkc foreign key (proveedoridc) references Proveedor(id)
);

create table Producto (
  codigo varchar(30) not null,
  cantidad int not null,
  nombre varchar(30) not null,
  precio float not null,
  proveedoridp varchar(30) not null,
  constraint pkpr Primary key(codigo),
  constraint fkpr foreign key (proveedoridp) references Proveedor(id)
);

create table Factura (
codigo int not null AUTO_INCREMENT,
proveedoridf varchar(30) not null,
clientenum int not null,
total float not null,
constraint pkf primary key (codigo),
constraint fkf1 foreign key (proveedoridf) references Proveedor(id),
constraint fkf2 foreign key (clientenum) references Cliente(numcliente)
);

create table Detalle (
codigo int not null AUTO_INCREMENT,
facturaidd int not null,
productoidd varchar(30) not null, 
cantidad int not null,
monto float not null,
constraint pkd primary key (codigo),
constraint fkd1 foreign key (facturaidd) references Factura(codigo),
constraint fkd2 foreign key (productoidd) references Producto(codigo)
);

-- modificacion y actualización
alter table Proveedor add estado bool;

INSERT INTO usuario (id, clave, rol)
VALUES ('admin', '{bcrypt}$2a$12$BsXiUUSUneCs6qWmRJONL.bPWf2e94pkJynYWNQ7GeZcukriMEyoq', 'ADM');

