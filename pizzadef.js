// pizzadef.js

// Variáveis globais
let pizzas = [
    { nome: "Calabresa", preco: 25.50, descricao: "Molho de tomate, mussarela, calabresa, cebola e azeitonas" },
    { nome: "Frango com Catupiry", preco: 28.50, descricao: "Molho de tomate, mussarela, frango desfiado, catupiry e milho" },
    { nome: "Quatro Queijos", preco: 27.50, descricao: "Molho de tomate, mussarela, provolone, parmesão e gorgonzola" },
    { nome: "Portuguesa", preco: 26.50, descricao: "Molho de tomate, mussarela, presunto, ovo, cebola, pimentão e azeitonas" }
];

let pedidos = [];

// Função para mostrar/ocultar seções
function mostrarcardapio(secao) {
    // Oculta todas as seções
    document.querySelectorAll('#cardapio, #cadastrar, #sobre, #contato, #pedidos').forEach(el => {
        el.classList.add('hidden');
    });
    
    // Mostra a seção selecionada
    if (secao === 'home') {
        // Mostra apenas o hero (já visível por padrão)
        return;
    }
    
    document.getElementById(secao).classList.remove('hidden');
    
    // Se for a seção de cardápio, atualiza a lista
    if (secao === 'cardapio') {
        atualizarCardapio();
    }
    
    // Se for a seção de pedidos, atualiza a lista
    if (secao === 'pedidos') {
        atualizarPedidos();
    }
}

// Função para atualizar o cardápio na tela
function atualizarCardapio() {
    const cardapioDiv = document.getElementById('cardapio');
    cardapioDiv.innerHTML = '<h2>Nosso Cardápio</h2>';
    
    pizzas.forEach((pizza, index) => {
        const pizzaDiv = document.createElement('div');
        pizzaDiv.className = 'cardapio-item';
        pizzaDiv.innerHTML = `
            <h3>Pizza de ${pizza.nome}</h3>
            <p>Preço: R$ ${pizza.preco.toFixed(2)}</p>
            <button onclick="mostrarIngredientes(${index})">Ingredientes</button>
            <button onclick="adicionarPedido(${index})">Fazer Pedido</button>
            <div id="descricao-${index}" class="hidden"></div>
        `;
        cardapioDiv.appendChild(pizzaDiv);
    });
}

// Função para mostrar ingredientes
function mostrarIngredientes(index) {
    const descricaoDiv = document.getElementById(`descricao-${index}`);
    
    if (descricaoDiv.classList.contains('hidden')) {
        descricaoDiv.classList.remove('hidden');
        descricaoDiv.textContent = pizzas[index].descricao;
    } else {
        descricaoDiv.classList.add('hidden');
    }
}

// Função para adicionar nova pizza
function adicionarPizza() {
    const nome = document.getElementById('nome-piazza').value;
    const preco = parseFloat(document.getElementById('pizza-preço').value);
    const descricao = document.getElementById('pizza-descricao').value;
    
    if (nome && !isNaN(preco) && descricao) {
        pizzas.push({
            nome: nome,
            preco: preco,
            descricao: descricao
        });
        
        // Limpa os campos
        document.getElementById('nome-piazza').value = '';
        document.getElementById('pizza-preço').value = '';
        document.getElementById('pizza-descricao').value = '';
        
        alert('Pizza cadastrada com sucesso!');
        atualizarCardapio();
    } else {
        alert('Por favor, preencha todos os campos corretamente!');
    }
}

// Função para adicionar pedido
function adicionarPedido(index) {
    const pizza = pizzas[index];
    pedidos.push({
        nome: pizza.nome,
        preco: pizza.preco,
        data: new Date().toLocaleString()
    });
    
    alert(`Pedido de Pizza de ${pizza.nome} adicionado!`);
}

// Função para atualizar lista de pedidos
function atualizarPedidos() {
    const listaPedidos = document.getElementById('lista-pedidos');
    listaPedidos.innerHTML = '';
    
    if (pedidos.length === 0) {
        listaPedidos.innerHTML = '<li>Nenhum pedido realizado ainda.</li>';
        return;
    }
    
    pedidos.forEach((pedido, i) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${pedido.nome}</strong> - R$ ${pedido.preco.toFixed(2)} 
            <small>(${pedido.data})</small>
            <button onclick="removerPedido(${i})">Remover</button>
        `;
        listaPedidos.appendChild(li);
    });
}

// Função para remover pedido
function removerPedido(index) {
    pedidos.splice(index, 1);
    atualizarPedidos();
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Garante que apenas o hero esteja visível inicialmente
    mostrarcardapio('home');
});