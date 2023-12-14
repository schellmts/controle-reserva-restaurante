//scripts de validação do formulário
document.getElementById('form-validation').addEventListener('submit', function(event) {
  if (!this.checkValidity()) {
      event.preventDefault();
      alert('Preencha todos os dados!')
  }
  else {
    alert('Formulário enviado!')
  }
});


//função para o viacep e a para não recarregar a página na hora da busca
 var botao = document.getElementById('btn-busca');
      botao.addEventListener('click', function(event) {
        event.preventDefault();
      });

function consultaEndereco() {
  let cep = document.querySelector('#cep').value;

  if (cep.length !== 9) {
    alert('CEP inválido');
    return;
  }

  let url = `https://viacep.com.br/ws/${cep}/json/`;

  fetch(url).then(function(response){
    response.json().then(mostrarEndereco);
  });
}

function mostrarEndereco(dados) {
  let resultado = document.querySelector('#resultado');
  let estado = document.querySelector('#estado');
  if (dados.erro) {
    resultado.innerHTML = `<p class="cidade"> Não foi possível localizar!</p>`;
    estado.innerHTML = `<p class="cidade"> Não foi possível localizar!</p>`;
  }
  else {
    resultado.innerHTML = `<p class="cidade">${dados.localidade}</p>`
    estado.innerHTML = `<p class="cidade">${dados.uf}</p>`
  }
}

//uso da api fake com json server
const searchInput = document.querySelector('#search-rest');
const resultSearch = document.querySelector('#optionsBox');

searchInput.addEventListener('input', async () => {
  const searchItem = searchInput.value.toLowerCase();
  
  if (searchItem.length > 0) {
    try {
      const response = await fetch(`http://localhost:3000/restaurantes?nome_like=${searchItem}`);
      const data = await response.json();
      
      resultSearch.innerHTML = '';
      resultSearch.style.display = "block";

      data.forEach(restaurante => {
        const nomeRestaurante = restaurante.nome;
        const restauranteElemento = document.createElement('div');
        restauranteElemento.textContent = nomeRestaurante;
        restauranteElemento.classList.add('option-item')
        resultSearch.appendChild(restauranteElemento);
      });
    } catch (error) {
      console.error('Erro ao buscar os restaurantes:', error);
    }
  } else {
    optionsBox.style.display = 'none';
  }
});

//script para um dropdown de pesquisa
document.addEventListener('click', function(event) {
  if (!optionsBox.contains(event.target) && event.target !== searchInput) {
    optionsBox.style.display = 'none';
  }
})

optionsBox.addEventListener('click', function(event) {
  if (event.target.classList.contains('option-item')) {
    searchInput.value = event.target.textContent;
    optionsBox.style.display = 'none'
  }
})

//script para armazenar no localstorage os dados do formulário
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('form-validation');

  form.addEventListener('submit', function(event) {
      event.preventDefault(); 

      const nome = document.getElementById('formGroupExampleInput').value;
      const email = document.getElementById('formGroupExampleInput2').value;
      const telefone = document.getElementById('telefone').value;
      const cpf = document.getElementById('cpfInput').value;
      const cep = document.getElementById('cep').value;
      const restaurante = document.getElementById('search-rest').value;
      const cidade = document.getElementById('resultado').textContent;
      const estado = document.getElementById('estado').textContent;

      const formData = {
          nome: nome,
          email: email,
          telefone: telefone,
          cpf: cpf,
          cep: cep,
          restaurante: restaurante,
          cidade: cidade,
          estado: estado
      };

      localStorage.setItem('formData', JSON.stringify(formData));
  });
});


//jquety mask para os formulários
$(document).ready(function(){
    $('#telefone').mask('(00) 00000-0000');
  });

  $(document).ready(function() {
    $('#cpfInput').mask('000.000.000-00');
  });

  $(document).ready(function() {
    $('#cep').mask('00000-000');
  });