/*
*@Author Gabriel Belarmino Santos <gabriel.santos@fatec.sp.gov.br
*@Since 2026-03-18
*@version 1.0.0
*@Description Essa função realiza o calculo do INSS
*@param {number} salario
*@return {number} o valor da do INSS
*/

function calculoInss(salario) {
    let inss = 0;    

    if(salario < 1621.01) {
        inss = salario * 0.075;
    } else if(salario < 2902.85) {
        inss = (salario * 0.09) - 24.32;
    } else if(salario < 4354.28) {
        inss = (salario * 0.12) - 111.40;
    } else {
        inss = (salario * 0.14) - 198.49;
    }

    if(inss > 988.09) {
        inss = 988.09;
    }
    return inss;
}

/*
*@Author Gabriel Belarmino Santos <gabriel.santos@fatec.sp.gov.br
*@Since 2026-03-18
*@version 1.0.0
*@Description Essa função realiza o calculo do IRRF
*@param {number} salario
*@param {number} INSS
*@return {number} o valor da do IRRF
*/

function calculoIrrf(salario, inss) {
    let irrf = 0;
    let salariobruto = salario - inss;

    if(salariobruto <= 2259.20) {
        irrf = 0;
    } else if(salariobruto <= 2828.65) {
        irrf = salariobruto * 0.075 - 169.44;
    } else if(salariobruto <= 3751.05) {
        irrf = salariobruto * 0.15 - 381.59;
    } else if(salariobruto <= 4664.68) {
        irrf = salariobruto * 0.225 - 662.92;
    } else {
        irrf = salariobruto * 0.275 - 896.15;
    }

    return irrf;
}


/*
*@Author Gabriel Belarmino Santos <gabriel.santos@fatec.sp.gov.br
*@Since 2026-03-18
*@version 1.0.0
*@Description Essa função realiza o calculo do salario liquido
*@param {number} salario
*@param {number} INSS
*@param {number} o valor da do IRRF
*@return {number} salario liquido
*/

function calculoHolerite(salario) {
    let valorinss = calculoInss(salario);
    let valorirrf = calculoIrrf(salario, valorinss);
    let liquido = salario - valorinss - valorirrf;

    return {salarioBruto: salario, inss : valorinss, irrf : valorirrf, salarioLiquido : liquido};
}


/*
Aguarda o clique no botão
*/

document.getElementById('botaoCalcular').addEventListener('click',function(){
    let salarioInput = document.getElementById('salarioBruto').value;
    let salario = parseFloat(salarioInput);
    let resultado = calculoHolerite(salario);

    document.getElementById('inss').value = resultado.inss.toFixed(2);
    document.getElementById('irrf').value = resultado.irrf.toFixed(2);
    document.getElementById('resultado').innerHTML = `<h3>Salário Líquido: R$ ${resultado.salarioLiquido.toFixed(2)}</h3>`;
    document.getElementById('resultado').style.display = "block";
})

document.getElementById('botaoLimpar').addEventListener('click', function(){
    document.getElementById('formulario').reset();
    document.getElementById('inss').value = '';
    document.getElementById('irrf').value = '';
    document.getElementById('resultado').innerHTML = ``;
    document.getElementById('resultado').style.display = "none";
})