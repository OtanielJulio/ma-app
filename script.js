// ============================================
// BANCO DE DADOS SIMULADO (como PostgreSQL)
// ============================================
let produtos = [];
let nextId = 1;

// ============================================
// ELEMENTOS DO DOM (ligação ao HTML)
// ============================================
const formProduto = document.getElementById('formProduto');
const produtosList = document.getElementById('produtosList');
const toast = document.getElementById('toast');

// ============================================
// FUNÇÃO: Mostrar notificações
// ============================================
function showToast(mensagem, tipo = 'success') {
    toast.textContent = mensagem;
    toast.className = `toast ${tipo} show`;

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ============================================
// STORED PROCEDURE SIMULADA (a "lógica C++")
// ============================================
function sp_movimentarStock(produtoId, quantidade) {
    // Encontrar o produto
    const produto = produtos.find(p => p.id === produtoId);

    if (!produto) {
        throw new Error('Produto não encontrado');
    }

    // ⚠️ VALIDAÇÃO CRÍTICA - IMPEDIR STOCK NEGATIVO
    if (produto.quantidade + quantidade < 0) {
        throw new Error(`⛔ STOCK INSUFICIENTE! Disponível: ${produto.quantidade}, Tentativa: ${quantidade}`);
    }

    // Atualizar stock
    produto.quantidade += quantidade;
    produto.updated_at = new Date().toISOString();

    return produto;
}

// ============================================
// FUNÇÃO: Criar novo produto
// ============================================
function criarProduto(produtoData) {
    // Validar SKU único
    if (produtos.some(p => p.sku === produtoData.sku)) {
        throw new Error('SKU já existe!');
    }

    const novoProduto = {
        id: nextId++,
        ...produtoData,
        quantidade: produtoData.quantidade || 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    };

    produtos.push(novoProduto);
    return novoProduto;
}

// ============================================
// FUNÇÃO: Renderizar tabela de produtos
// ============================================
function renderizarProdutos() {
    if (produtos.length === 0) {
        produtosList.innerHTML = '<p class="empty-state">📭 Nenhum produto cadastrado</p>';
        return;
    }

    let html = `
        <table>
            <thead>
                <tr>
                    <th>SKU</th>
                    <th>Nome</th>
                    <th>Quantidade</th>
                    <th>Preço</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
    `;

    produtos.forEach(produto => {
        const quantidadeClass = produto.quantidade === 0 ? 'quantidade zero' : 'quantidade positivo';
        const precoFormatado = produto.preco.toLocaleString('pt-PT', {
            style: 'currency',
            currency: 'EUR'
        });

        html += `
            <tr>
                <td><strong>${produto.sku}</strong></td>
                <td>${produto.nome}</td>
                <td class="${quantidadeClass}">${produto.quantidade}</td>
                <td>${precoFormatado}</td>
                <td class="acoes">
                    <button class="btn btn-success btn-sm" onclick="movimentarStock(${produto.id}, 1)">+1</button>
                    <button class="btn btn-danger btn-sm" onclick="movimentarStock(${produto.id}, -1)" 
                        ${produto.quantidade === 0 ? 'disabled' : ''}>-1</button>
                    <button class="btn btn-sm" style="background:#9ca3af; color:white;" 
                        onclick="eliminarProduto(${produto.id})">🗑️</button>
                </td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;

    produtosList.innerHTML = html;
}

// ============================================
// FUNÇÕES GLOBAIS (para os botões)
// ============================================
window.movimentarStock = function (id, quantidade) {
    try {
        // Chamar a "Stored Procedure"
        const produtoAtualizado = sp_movimentarStock(id, quantidade);

        // Atualizar a interface
        renderizarProdutos();

        const mensagem = quantidade > 0 ? '✅ Stock adicionado!' : '✅ Stock removido!';
        showToast(mensagem, 'success');

    } catch (error) {
        showToast(error.message, 'error');
    }
};

window.eliminarProduto = function (id) {
    if (!confirm('Tem a certeza que pretende eliminar este produto?')) {
        return;
    }

    const index = produtos.findIndex(p => p.id === id);
    if (index !== -1) {
        produtos.splice(index, 1);
        renderizarProdutos();
        showToast('🗑️ Produto eliminado!', 'success');
    }
};

// ============================================
// EVENTO: Submeter formulário
// ============================================
formProduto.addEventListener('submit', (e) => {
    e.preventDefault();

    const produtoData = {
        sku: document.getElementById('sku').value.toUpperCase(),
        nome: document.getElementById('nome').value,
        preco: parseFloat(document.getElementById('preco').value),
        quantidade: parseInt(document.getElementById('quantidade').value) || 0
    };

    try {
        const novoProduto = criarProduto(produtoData);
        renderizarProdutos();
        formProduto.reset();
        showToast('✅ Produto criado com sucesso!', 'success');
    } catch (error) {
        showToast(error.message, 'error');
    }
});

// ============================================
// INICIALIZAR COM DADOS DE EXEMPLO
// ============================================
function initData() {
    produtos = [
        {
            id: nextId++,
            sku: 'TEC001',
            nome: 'Teclado Mecânico RGB',
            quantidade: 50,
            preco: 299.90,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        },
        {
            id: nextId++,
            sku: 'MON002',
            nome: 'Monitor 24" Full HD',
            quantidade: 30,
            preco: 899.90,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        },
        {
            id: nextId++,
            sku: 'MOU003',
            nome: 'Mouse Gamer',
            quantidade: 15,
            preco: 49.90,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        }
    ];
    renderizarProdutos();
}

// Iniciar
initData();

console.log('🚀 Sistema de Gestão de Stock iniciado!');
console.log('📦 A Stored Procedure está a validar stock negativo!');
