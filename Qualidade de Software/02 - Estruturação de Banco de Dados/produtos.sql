create table produtos (
id_produto int auto_increment primary key,
nome varchar(100) NOT NULL,
quantidade_estoque varchar(100) NOT NULL,
data_cadastro date NOT NULL
);

alter table produtos add descricao varchar(100);