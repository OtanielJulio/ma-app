import { useEffect, useState } from "react";
import type { Produto } from "../interfaces/Produto";
import { ProdutoService } from "../services/ProdutoService";

const service = new ProdutoService();

function TabelaProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    const data = await service.listarProdutos();
    setProdutos(data);
  };

  return (
    <table border={1} cellPadding={10}>
      <thead>
        <tr>
          <th>Nome</th>
          <th>SKU</th>
          <th>Quantidade</th>
          <th>Preço</th>
        </tr>
      </thead>

      <tbody>
        {produtos.map((produto) => (
          <tr key={produto.id}>
            <td>{produto.nome}</td>
            <td>{produto.sku}</td>
            <td>{produto.quantidade}</td>
            <td>{produto.preco}€</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TabelaProdutos;
