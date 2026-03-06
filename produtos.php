<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$produtos = [
    ["id" => 1, "nome" => "Mouse", "preco" => 10, "quantidade" => 5],
    ["id" => 2, "nome" => "Teclado", "preco" => 20, "quantidade" => 3]
];

echo json_encode($produtos);
