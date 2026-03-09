import type { Produto } from "../interfaces/Produto"

export class ProdutoService {

    private api = "http://localhost/api/produtos"

    async listarProdutos(): Promise<Produto[]> {

        const res = await fetch(this.api)

        if (!res.ok) {
            throw new Error("Erro ao carregar produtos")
        }

        return res.json()
    }
}
