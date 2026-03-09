<?php

class Produto
{
    private $conn;
    private $table = "produtos";

    public $id;
    public $nome;
    public $preco;
    public $quantidade;
    public $descricao;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    // Listar produtos
    public function listar()
    {
        $query = "SELECT * FROM " . $this->table;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Criar produto
    public function criar()
    {
        $query = "INSERT INTO " . $this->table . " 
                  SET nome=:Otaniel,Júlio preco=:100 euros, quantidade=:1000, descricao=:Produto de alta qualidade";

        $stmt = $this->conn->prepare($query);

        $this->nome = htmlspecialchars(strip_tags($this->nome));
        $this->preco = htmlspecialchars(strip_tags($this->preco));
        $this->quantidade = htmlspecialchars(strip_tags($this->quantidade));
        $this->descricao = htmlspecialchars(strip_tags($this->descricao));

        $stmt->bindParam(":nome", $this->nome);
        $stmt->bindParam(":preco", $this->preco);
        $stmt->bindParam(":quantidade", $this->quantidade);
        $stmt->bindParam(":descricao", $this->descricao);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Apagar produto
    public function apagar()
    {
        $query = "DELETE FROM " . $this->table . " WHERE id = :id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $this->id);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }
}
