// Array para armazenar as pizzas cadastradas
let cardapio = [
    { nome: "Calabresa", preco: "R$ 25,50", descricao: "Molho de tomate, calabresa, cebola e orégano" },
    { nome: "Frango com Catupiry", preco: "R$ 28,50", descricao: "Molho de tomate, frango desfiado, catupiry e orégano" },
    { nome: "Quatro Queijos", preco: "R$ 27,50", descricao: "Molho de tomate, mussarela, provolone, parmesão, gorgonzola e orégano" },
    { nome: "Portuguesa", preco: "R$ 26,50", descricao: "Molho de tomate, presunto, ovo, cebola, azeitona, mussarela e orégano" }
];

let vendas = [];

// Função para mostrar a seção correta e esconder as outras
function mostrarcardapio(secao) {
    const secoes = ["home", "cadastrar", "cardapio", "sobre", "contato", "pedidos", "Vendas", "Alterar", "pagamento", "consultar", "mensagens", "AlterarPedido"];
    secoes.forEach(id => {
        const elemento = document.getElementById(id);
        if (elemento) {
            if (id === secao) {
                elemento.classList.remove("hidden");
            } else {
                elemento.classList.add("hidden");
            }
        }
    });
    if (secao === 'cardapio') {
        renderizarCardapio();
    }
}

// Função para renderizar o cardápio na tela
function renderizarCardapio() {
    const cardapioDiv = document.getElementById("cardapio");
    // Limpa o conteúdo atual do cardápio, exceto o título "Nossos Preços"
    const itensAnteriores = cardapioDiv.querySelectorAll(".cardapio-item, .pizza-item-container");
    itensAnteriores.forEach(item => item.remove());

    cardapio.forEach((pizza, index) => {
        const pizzaDiv = document.createElement("div");
        pizzaDiv.classList.add("cardapio-item"); // Mantém a classe original para consistência

        const nomePizza = document.createElement("h3");
        nomePizza.textContent = pizza.nome;

        const precoPizza = document.createElement("p");
        precoPizza.textContent = `Preço: ${pizza.preco}`;

        const descricaoPizza = document.createElement("p");
        descricaoPizza.textContent = pizza.descricao;
        descricaoPizza.style.display = "none"; // Inicialmente escondida

        const botaoIngredientes = document.createElement("button");
        botaoIngredientes.textContent = "Ingredientes";
        botaoIngredientes.onclick = () => {
            descricaoPizza.style.display = descricaoPizza.style.display === "none" ? "block" : "none";
        };
        
        const botaoAlterar = document.createElement("button");
        botaoAlterar.textContent = "Alterar Pizza";
        botaoAlterar.onclick = () => abrirModalAlteracao(index);

        pizzaDiv.appendChild(nomePizza);
        pizzaDiv.appendChild(precoPizza);
        pizzaDiv.appendChild(botaoIngredientes);
        pizzaDiv.appendChild(descricaoPizza); // Adiciona a descrição abaixo do botão
        pizzaDiv.appendChild(botaoAlterar);

        const botaoFazerPedido = document.createElement("button");
        botaoFazerPedido.textContent = "Fazer Pedido";
        botaoFazerPedido.onclick = () => fazerPedido(index);
        pizzaDiv.appendChild(botaoFazerPedido);
        cardapioDiv.appendChild(pizzaDiv);
    });
}

// Função para adicionar uma nova pizza ao cardápio
function adicionarPizza() {
    const nome = document.getElementById("nome-piazza").value;
    const preco = document.getElementById("pizza-preço").value;
    const descricao = document.getElementById("pizza-descricao").value;

    if (nome && preco && descricao) {
        cardapio.push({ nome, preco, descricao });
        document.getElementById("nome-piazza").value = "";
        document.getElementById("pizza-preço").value = "";
        document.getElementById("pizza-descricao").value = "";
        exibirMensagem("Pizza adicionada com sucesso!");
        renderizarCardapio(); // Atualiza a exibição do cardápio
        mostrarcardapio('cardapio'); // Mostra a seção do cardápio
    } else {
        exibirMensagem("Por favor, preencha todos os campos.");
    }
}

// Função para abrir o modal/formulário de alteração
function abrirModalAlteracao(index) {
    const pizza = cardapio[index];
    document.getElementById("alterar-nome-pizza").value = pizza.nome;
    document.getElementById("alterar-preco-pizza").value = pizza.preco;
    document.getElementById("alterar-descricao-pizza").value = pizza.descricao;
    document.getElementById("Alterar").dataset.pizzaIndex = index; // Armazena o índice da pizza
    mostrarcardapio("Alterar");
}

// Função para confirmar a alteração da pizza
function confirmarAlteracaoPizza() {
    const index = document.getElementById("Alterar").dataset.pizzaIndex;
    const novoNome = document.getElementById("alterar-nome-pizza").value;
    const novoPreco = document.getElementById("alterar-preco-pizza").value;
    const novaDescricao = document.getElementById("alterar-descricao-pizza").value;

    if (novoNome && novoPreco && novaDescricao) {
        alterarPizza(parseInt(index), novoNome, novoPreco, novaDescricao);
        // Limpar os campos após a alteração
        document.getElementById("alterar-nome-pizza").value = "";
        document.getElementById("alterar-preco-pizza").value = "";
        document.getElementById("alterar-descricao-pizza").value = "";
    } else {
        exibirMensagem("Por favor, preencha todos os campos para alterar a pizza.");
    }
}

// Função para alterar uma pizza existente no cardápio
function alterarPizza(index, novoNome, novoPreco, novaDescricao) {
    if (index >= 0 && index < cardapio.length) {
        cardapio[index].nome = novoNome;
        cardapio[index].preco = novoPreco;
        cardapio[index].descricao = novaDescricao;
        exibirMensagem("Pizza alterada com sucesso!");
        renderizarCardapio(); // Atualiza a exibição do cardápio
        mostrarcardapio('cardapio'); // Garante que o cardápio está visível
    } else {
        exibirMensagem("Erro ao alterar pizza: índice inválido.");
    }
}

// Inicializa a visualização do cardápio quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    mostrarcardapio('home'); // Ou a seção que deve ser visível inicialmente
    renderizarCardapio(); // Renderiza o cardápio inicial
});




// Função para preencher os dados do pedido na aba de pagamento
function fazerPedido(index) {
    const pizza = cardapio[index];
    document.getElementById("pizza-pedido").value = pizza.nome;
    document.getElementById("valor-pizza").value = pizza.preco;
    mostrarcardapio("pagamento");
}

// Função para finalizar o pedido
function finalizarPedido() {
    const nomeComprador = document.getElementById("nome-comprador").value;
    const pizzaPedida = document.getElementById("pizza-pedido").value;
    const valorPizza = document.getElementById("valor-pizza").value;
    const metodoPagamento = document.getElementById("metodo-pagamento").value;

    if (nomeComprador && pizzaPedida && valorPizza && metodoPagamento) {
        exibirMensagem(`Pedido finalizado com sucesso!\nComprador: ${nomeComprador}\nPizza: ${pizzaPedida}\nValor: ${valorPizza}\nMétodo de Pagamento: ${metodoPagamento}`);
        vendas.push({ comprador: nomeComprador, pizza: pizzaPedida, valor: valorPizza, metodo: metodoPagamento });
        // Limpar os campos após finalizar o pedido
        document.getElementById("nome-comprador").value = "";
        document.getElementById("pizza-pedido").value = "";
        document.getElementById("valor-pizza").value = "";
        mostrarcardapio("home"); // Volta para a página inicial ou para a lista de pedidos
    } else {
        exibirMensagem("Por favor, preencha todos os campos do pedido.");
    }
}



// Função para renderizar o relatório de vendas
function renderizarRelatorioVendas() {
    const vendasDiv = document.getElementById("Vendas");
    vendasDiv.innerHTML = "<h2>Relatório de Vendas</h2>"; // Limpa o conteúdo anterior

    if (vendas.length === 0) {
        vendasDiv.innerHTML += "<p>Nenhuma venda registrada ainda.</p>";
        return;
    }

    const ul = document.createElement("ul");
    vendas.forEach(venda => {
        const li = document.createElement("li");
        li.textContent = `Comprador: ${venda.comprador}, Pizza: ${venda.pizza}, Valor: ${venda.valor}, Método: ${venda.metodo}`;
        ul.appendChild(li);
    });
    vendasDiv.appendChild(ul);
}

// Modifica a função mostrarcardapio para chamar renderizarRelatorioVendas
const originalMostrarCardapio = mostrarcardapio;
mostrarcardapio = function(secao) {
    originalMostrarCardapio(secao);
    if (secao === 'Vendas') {
        renderizarRelatorioVendas();
    }
};



// Função para exibir mensagens na tela
function exibirMensagem(mensagem) {
    const areaMensagens = document.getElementById("area-mensagens");
    if (areaMensagens) {
        areaMensagens.innerHTML = `<p>${mensagem}</p>`;
        mostrarcardapio("mensagens");
    }
}

// Função para consultar pizza
function consultarPizza() {
    const nomeConsulta = document.getElementById("consulta-nome-pizza").value.toLowerCase();
    const resultadoConsultaDiv = document.getElementById("resultado-consulta");
    resultadoConsultaDiv.innerHTML = ""; // Limpa resultados anteriores

    const pizzaEncontrada = cardapio.find(pizza => pizza.nome.toLowerCase() === nomeConsulta);

    if (pizzaEncontrada) {
        resultadoConsultaDiv.innerHTML = `
            <h3>${pizzaEncontrada.nome}</h3>
            <p>Preço: ${pizzaEncontrada.preco}</p>
            <p>Descrição: ${pizzaEncontrada.descricao}</p>
        `;
        exibirMensagem(`Pizza '${pizzaEncontrada.nome}' encontrada.`);
    } else {
        resultadoConsultaDiv.innerHTML = "<p>Pizza não encontrada.</p>";
        exibirMensagem(`Pizza '${nomeConsulta}' não encontrada.`);
    }
}

// Função para renderizar a lista de pedidos
function renderizarListaPedidos() {
    const listaPedidosUl = document.getElementById("lista-pedidos");
    listaPedidosUl.innerHTML = ""; // Limpa a lista anterior

    if (vendas.length === 0) {
        listaPedidosUl.innerHTML = "<li>Nenhum pedido realizado ainda.</li>";
        return;
    }

    vendas.forEach((venda, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>Pedido ${index + 1}:</strong><br>
            Comprador: ${venda.comprador}<br>
            Pizza: ${venda.pizza}<br>
            Valor: ${venda.valor}<br>
            Método de Pagamento: ${venda.metodo}
            <button onclick="abrirModalAlteracaoPedido(${index})">Alterar Pedido</button>
        `;
        listaPedidosUl.appendChild(li);
    });
}

// Modifica a função mostrarcardapio para chamar renderizarListaPedidos
const originalMostrarCardapioPedidos = mostrarcardapio;
mostrarcardapio = function(secao) {
    originalMostrarCardapioPedidos(secao);
    if (secao === 'pedidos') {
        renderizarListaPedidos();
    }
};



// Função para abrir o modal/formulário de alteração de pedido
function abrirModalAlteracaoPedido(index) {
    const pedido = vendas[index];
    document.getElementById("alterar-pedido-comprador").value = pedido.comprador;
    document.getElementById("alterar-pedido-pizza").value = pedido.pizza;
    document.getElementById("alterar-pedido-valor").value = pedido.valor;
    document.getElementById("alterar-pedido-metodo").value = pedido.metodo;
    document.getElementById("AlterarPedido").dataset.pedidoIndex = index; // Armazena o índice do pedido
    mostrarcardapio("AlterarPedido");
}

// Função para confirmar a alteração do pedido
function confirmarAlteracaoPedido() {
    const index = document.getElementById("AlterarPedido").dataset.pedidoIndex;
    const novoComprador = document.getElementById("alterar-pedido-comprador").value;
    const novaPizza = document.getElementById("alterar-pedido-pizza").value;
    const novoValor = document.getElementById("alterar-pedido-valor").value;
    const novoMetodo = document.getElementById("alterar-pedido-metodo").value;

    if (novoComprador && novaPizza && novoValor && novoMetodo) {
        vendas[index].comprador = novoComprador;
        vendas[index].pizza = novaPizza;
        vendas[index].valor = novoValor;
        vendas[index].metodo = novoMetodo;
        exibirMensagem("Pedido alterado com sucesso!");
        renderizarListaPedidos(); // Atualiza a exibição da lista de pedidos
        mostrarcardapio("pedidos"); // Garante que a lista de pedidos está visível
        // Limpar os campos após a alteração
        document.getElementById("alterar-pedido-comprador").value = "";
        document.getElementById("alterar-pedido-pizza").value = "";
        document.getElementById("alterar-pedido-valor").value = "";
        document.getElementById("alterar-pedido-metodo").value = "pix";
    } else {
        exibirMensagem("Por favor, preencha todos os campos para alterar o pedido.");
    }
}

