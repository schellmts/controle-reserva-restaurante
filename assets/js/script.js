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
  
