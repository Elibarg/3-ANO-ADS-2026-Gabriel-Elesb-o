create table produtos (
id_produto int auto_increment primary key,
nome varchar(100) NOT NULL,
preco varchar(100) NOT NULL,
quantidade_estoque varchar(100) NOT NULL,
data_cadastro date NOT NULL
);

alter table produtos add descricao varchar(100);

alter table produtos modify preco decimal(8, 2)

alter table produtos drop column quantidade_estoque

drop table produtos