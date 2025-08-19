  const ativarOption = document.querySelectorAll('.option');

  function addClass(event) {
    ativarOption.forEach(function(option) {
      option.classList.remove("option-ativo");
    });

    event.target.classList.add("option-ativo");
  }

  ativarOption.forEach(function(option) {
    option.addEventListener('click', addClass);
  });





  const rangeCustom = document.querySelector('.range');
  const numberCustom = document.querySelector('.number');


  rangeCustom.max = 20;

  function syncRangeWithNumber() {
    numberCustom.value = rangeCustom.value;
  }

  function syncNumberWithRange() {
    rangeCustom.value = numberCustom.value;
  }

  rangeCustom.addEventListener('input', syncRangeWithNumber);

  numberCustom.addEventListener('input', syncNumberWithRange);





  const checkboxUpper = document.querySelector('.c1 input');
  const checkboxLower = document.querySelector('.c2 input');
  const checkboxNumbers = document.querySelector('.c3 input');
  const checkboxSymbols = document.querySelector('.c4 input');
  const rangeInput = document.querySelector('.range');
  const numberInput = document.querySelector('.number');
  const resultInput = document.querySelector('.result input');
  const generateButton = document.querySelector('.generate-btn');

  function generatePassword() {
    let characters = ""; 

    if (checkboxUpper.checked) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (checkboxLower.checked) characters += "abcdefghijklmnopqrstuvwxyz";
    if (checkboxNumbers.checked) characters += "0123456789";
    if (checkboxSymbols.checked) characters += "!@#$%^&*()_+-=[]{}|;:'\",.<>?/";

    if (characters === "") {
      alert("Selecione pelo menos uma opção para a senha.");
      return "";
    }

    const passwordLength = parseInt(numberInput.value); 

    let password = "";
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }

    return password;
  }

  function displayGeneratedPassword() {
    const password = generatePassword();
    if (password) resultInput.value = password; 
  }

  generateButton.addEventListener('click', displayGeneratedPassword);


const copyButton = document.querySelector('.result button');
copyButton.addEventListener('click', () => {
  const password = resultInput.value;

  if (!password) {
    alert("Nenhuma senha para copiar!");
    return;
  }

  navigator.clipboard.writeText(password)
    .then(() => {
      alert("Senha copiada com sucesso!");
    })
    .catch(err => {
      alert("Erro ao copiar a senha: " + err);
    });
});