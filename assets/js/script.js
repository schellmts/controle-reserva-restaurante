const form = document.getElementById('form-validation');
const campos = document.querySelectorAll('.required');
const spans = document.querySelectorAll('.span-required');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setError(index){
  campos[index].style.border = '1px solid #e63636';
  spans[index].style.display = 'block'
}

function removeError(index) {
  campos[index].style.border = '';
  spans[index].style.display = 'none'
}


function nameValidate(){
  if (campos[0].value.length < 3) {
    setError(0);
  }
  else {
    removeError(0);
  }
}

function emailValidate() {
  if(!emailRegex.test(campos[1].value)) {
    setError(1);
  }
  else {
    removeError(1);
  }
}

function telValidate() {
  if(campos[2].value.length < 10) {
    setError(2);
  }
  else {
    removeError(2);
  }
}

function cpfValidate(){
  if(campos[3].value.length < 10) {
    setError(3);
  }
  else {
    removeError(3);
  }
}

function cepValidate() {
  if(campos[4].value.length < 8) {
    setError(4);
  }
  else {
    removeError(4);
  }
}

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

function cityValidate() {
  if(campos[5].value.length < 3) {
    setError(5);
  }
  else {
    removeError(5);
  }
}

$(document).ready(function(){
    $('#telefone').mask('(00) 00000-0000');
  });

  $(document).ready(function() {
    $('#cpfInput').mask('000.000.000-00');
  });

  $(document).ready(function() {
    $('#cep').mask('00000-000');
  });

  
  
