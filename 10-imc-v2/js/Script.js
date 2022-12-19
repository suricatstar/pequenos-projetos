function start() {
    var buttonCalculateImc = document.querySelector('#button-calculate-imc');
    /*console.log(buttonCalculateImc)*/
    /*buttonCalculateImc.textContent = 'Modifiquei';*/
    buttonCalculateImc.addEventListener('click',handleButtonClick);
    var inputWeight = document.querySelector('#input-weight');
    var inputHeight = document.querySelector('#input-height');

    inputWeight.addEventListener('input',handleButtonClick);
    inputHeight.addEventListener('input',handleButtonClick);

    handleButtonClick();
}
function calculateImc(weight,height) {
    return weight/height**2
}
function handleButtonClick() {
    var inputWeight = document.querySelector('#input-weight');
    var inputHeight = document.querySelector('#input-height');
    var imcResult = document.querySelector('#imc-result');
    var imcvalue = '';
    var imccategory = document.querySelector('#imc-category');

    var weight = Number (inputWeight.value);
    var height = Number (inputHeight.value);
   
    var imc = calculateImc(weight,height)
    imcResult.textContent = imc.toFixed(2).replace('.',',');

    if (imc<16) {
        imcvalue = 'Inválido';
    }
    else if (16<imc && imc<=17) {
        imcvalue = 'Muito abaixo do peso';
    }
    else if (17<imc && imc<=18.5){
        imcvalue = 'Abaixo do peso';
    }
    else if (18.5<imc && imc<=25){
        imcvalue = 'Peso normal';
    }
    else if(25<imc && imc<=30){
        imcvalue = 'acima do peso';
    }
    else if(30<imc && imc<=35){
        imcvalue = 'Obesidade grau 1';
    }
    else if (35<imc && imc<=40){
        imcvalue = 'Obesidade grau 2';
    }
    else {
        imcvalue = 'Obesidade grau 3';
    }
    imccategory.textContent = imcvalue;
}
start();