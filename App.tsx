import CartaoPerfil from "./components/CartaoPerfil";
import Botao from "./components/Botao";
import Contador from "./components/Contador";
import TabelaProdutos from "./components/TabelaProdutos";

function App() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>Sistema de Gestão de Stock</h1>

      <CartaoPerfil
        nome="Natalia"
        cargo="Programadora"
        imagem="https://i.pravatar.cc/100"
      />

      <Botao texto="Clicar" onClick={() => alert("Botão clicado")} />

      <Contador />

      <h2>Produtos</h2>

      <TabelaProdutos />
    </div>
  );
}

export default App;
