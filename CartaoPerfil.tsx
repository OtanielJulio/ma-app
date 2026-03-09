type CartaoPerfilProps = {
  nome: string;
  cargo: string;
  imagem: string;
};

function CartaoPerfil({ nome, cargo, imagem }: CartaoPerfilProps) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        width: "200px",
        textAlign: "center",
        borderRadius: "10px",
      }}
    >
      <img
        src={imagem}
        alt={nome}
        style={{ width: "100px", borderRadius: "50%" }}
      />

      <h3>{nome}</h3>
      <p>{cargo}</p>
    </div>
  );
}

export default CartaoPerfil;
