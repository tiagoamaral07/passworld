
const ativarOption = document.querySelectorAll('.option');

const checkboxUpper = document.querySelector('.c1 input');
const checkboxLower = document.querySelector('.c2 input');
const checkboxNumbers = document.querySelector('.c3 input');
const checkboxSymbols = document.querySelector('.c4 input');

const allCheckboxes = [checkboxUpper, checkboxLower, checkboxNumbers, checkboxSymbols];

const rangeCustom = document.querySelector('.range');
const numberCustom = document.querySelector('.number');

const resultInput = document.querySelector('.result input');
const generateButton = document.querySelector('.generate-btn');
const copyButton = document.querySelector('.result button');



function addClass(event) {
  ativarOption.forEach(option => option.classList.remove("option-ativo"));

  const selected = event.currentTarget;
  selected.classList.add("option-ativo");

  const isPIN = selected.id === "pin";

  if (isPIN) {
    checkboxUpper.checked = false;
    checkboxUpper.disabled = true;

    checkboxLower.checked = false;
    checkboxLower.disabled = true;

    checkboxSymbols.checked = false;
    checkboxSymbols.disabled = true;

    checkboxNumbers.checked = true;
    checkboxNumbers.disabled = false;

    numberCustom.value = 4;
    rangeCustom.value = 4;
  } else {
  
    allCheckboxes.forEach(cb => cb.disabled = false);
  }
}

ativarOption.forEach(option => {
  option.addEventListener('click', addClass);
});



rangeCustom.max = 20;

function syncRangeWithNumber() {
  numberCustom.value = rangeCustom.value;
}

function syncNumberWithRange() {
  rangeCustom.value = numberCustom.value;
}

rangeCustom.addEventListener('input', syncRangeWithNumber);
numberCustom.addEventListener('input', syncNumberWithRange);



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

  const passwordLength = parseInt(numberCustom.value);
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
