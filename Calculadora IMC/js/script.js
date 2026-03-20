/**
*@author Gabriel Belarmino <gabriel.santos@fatec.sp.gov.br
*@since 2026-02-24
*@version 1.0.0
*@description Esta função define data limite.
*/

function configuraDataLimite() {
    const limite = new Date() .toISOString() .split("T")[0]
    const inputNasc = document.getElementById("nascimento")
    if(inputNasc) {
        inputNasc.setAttribute("max", limite) 
        inputNasc.setAttribute("min", '1920-01-01') 
    }    
}

document.addEventListener("DOMContentLoaded", configuraDataLimite)

/** 
*@autor Gabriel Belarmino dos Santos
*@since 2026-03-03
*@version 1.0.0
*@description Esta função calcula o IMC
*@param {number} peso - o peso da pessoa em kg
*@param {number} altura - a altura da pessoa em metros
*@returns {number} - o valor do IMC calculado 
*/

function calcularIMC(peso, altura) {
    const imc = peso / (altura * altura)
    return imc
}
//console.log(calcularIMC(79,1.70))

/**
 * classificação do IMC
 * @author Gabriel Belarmino dos Santos 
 * @since 2023-03-03
 * @version 1.0.0
 * @description exibe o parametro baseado no IMC
 * @param {number} imc
 * @returns {string}
 */

function obterClassificacaoIMC(imc) {
    let resultado = ""

    if(imc < 18.5) {
        resultado = "Abaixo do peso!"
    } else if(imc < 25) {
        resultado = "Peso normal!"
    } else if(imc < 30) {
        resultado = "Você está com sobrepeso!"
    } else {
        resultado = "Você está obeso!"
    }
    return resultado
}
//console.log(obterClassificacaoIMC(27.55))

/**
 * Função que processa o calculo e exibe ao usuario na UI
 * @param {event} event 
 */

function processaCalculo(event) {
    if(event) event.preventDefault() //evita o recarregamento da pagina
    //captur os campos
    const nome = document.getElementById("nome").value
    const nascimento = document.getElementById("nascimento").value
    const peso = document.getElementById("peso").value
    const altura = document.getElementById("altura").value
    const divresultado = document.getElementById("resultado")
    if(!nome || !nascimento || isNaN(peso) || isNaN(altura)) {
        alert("Por favor, preencha todos os campos corretament!")
    }

    //efetuando os calculos com as funçoes criaas
    const imc = calcularIMC(peso, altura)
    const classificacao = obterClassificacaoIMC(imc)
    const idade = calcularIdade(nascimento)
    //monstrando o resultado na div
    divresultado.style.display = "block" // exibe a div novamente na UI
    divresultado.innerHTML = `
                            Resultado para <i><strong> ${nome}</strong></i>: <br>
                            IMC: <i><strong>${imc.toFixed(2)}</strong></i><br>
                            Idade: <i><strong>${idade}</strong></i><br>
                            Status: <i><strong>${classificacao}</strong></i>                            
                            `
    }

    /**
     * Calcula a idade da pessoa a partir da data de nascimento
     * @param {string} nascimento
     * @returns {number}
     */

    function calcularIdade(nascimento) {
        const dataNasc = new Date (nascimento)
        const hoje = new Date()
        let idade = hoje.getFullYear() - dataNasc.getFullYear()
        const mes = hoje.getMonth() - dataNasc.getMonth()
        if(mes < 0 || (mes === 0 && hoje.getDate() < dataNasc.getDate())) {
            idade --
        }
        return idade
    }

    //limpa o resultado
    document.addEventListener("reset", () => {
        const divResultado = document.getElementById("resultado")
        //limpa o texto da div
        divResultado.innerHTML = ""
        //oculta o elemento
        divResultado.style.display = "none"
    })