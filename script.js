
// let cores = []
let dinos = []
let iDinoSelecionado = -1

function adicionarDino() {
    document.getElementById('divCorCompleta').style.visibility = 'hidden'
    document.getElementById('divFechou5').style.visibility = 'hidden'
    document.getElementById('divFechouTodos').style.visibility = 'hidden'
    document.getElementById('divResultado').style.background = "#212121"
    document.getElementById('divResultado').innerHTML = ""
    document.getElementById('divContainer').style.background = "#212121"

    let dino = {
        nome: prompt("Qual o nome do dino? "),
        cores: criarVetordeCores(),
        coresCompletas: [],
        ctrlZ: []
    }

    dinos.push(dino)
    iDinoSelecionado = dinos.length - 1
    atualizarSelect()
    selectDinos.value = dinos[iDinoSelecionado].nome
    atualizarCores()
    atualizarCoresCompletas()
}

let selectDinos = document.getElementById('selectDinos')

function atualizarSelect() {
    selectDinos.innerHTML = ""
    dinos.forEach(e => selectDinos.innerHTML += `<option value=${e.nome}>${e.nome}</option>`);

    // selectDinos.innerHTML += `<option value='ola mundo' >ola dnv</option>`
}

function selecionarDino() {
    for (i = 0; i < dinos.length; i++) {
        if (dinos[i].nome == selectDinos.value) {
            iDinoSelecionado = i
            atualizarCores()
            atualizarCoresCompletas()
        }
    }



}

function criarVetordeCores() {
    let cores = []
    for (i = 0; i <= 227; i++) {
        let cor = {
            regioes: [1, 1, 1, 1, 1, 0],
            completa: false
        }
        cores.push(cor)
    }
    return cores
}

function atualizarCores() {
    if (iDinoSelecionado != -1) {
        for (i = 1; i <= 227; i++) {
            if (i <= 100 || i >= 201) {
                document.getElementById('cor' + i).innerHTML = i + ' ' + nomesCores[i] + ' |'
                for (j = 0; j <= 5; j++) {
                    document.getElementById('cor' + i).innerHTML += `${j}:${dinos[iDinoSelecionado].cores[i].regioes[j]}|`

                }
            }
        }
    }
    atualizarCoresCompletas()
}
divCores = document.getElementById("divCores")

function atualizarCoresCompletas() {
    if (iDinoSelecionado != -1) {
        dinos[iDinoSelecionado].coresCompletas = []
        if (iDinoSelecionado != -1) {
            for (i = 1; i < dinos[iDinoSelecionado].cores.length; i++) {
                if (dinos[iDinoSelecionado].cores[i].completa == true) {
                    dinos[iDinoSelecionado].coresCompletas.push(i)
                }
            }
        }
        document.getElementById('divCoresCompletas').innerHTML = "Lista de cores completas: " + dinos[iDinoSelecionado].coresCompletas
    }
}

function criarTabelaDeCores() {
    for (i = 1; i <= 227; i++) {
        if (i <= 100 || i > 200) {
            let id = "cor" + i
            divCores.innerHTML += `<div id=${id} class="divCor">${nomesCores[i]}</div>`
            document.getElementById("cor" + i).style.background = hexCores[i]
            if (coresEscuras.includes(i)) {
                document.getElementById("cor" + i).style.color = 'white'
            } else {
                document.getElementById("cor" + i).style.color = 'black'
            }
        }
    }
    document.getElementById('cor2').style.background = "#0000ff"
}

document.getElementById('inpCor').addEventListener('keyup', enterCor)
document.getElementById('inpReg').addEventListener('keyup', enterReg)

document.getElementById('inpCor2').addEventListener('keyup', enterCor2)
document.getElementById('inpReg2').addEventListener('keyup', enterReg2)
document.getElementById('inpQtd').addEventListener('keyup', enterQtd)

document.body.addEventListener('keydown', desfazer)
document.getElementById('inpCor').focus()

function enterCor(e) {
    if (e.key == 'Enter') {
        let corLida = Number(document.getElementById('inpCor').value)
        if ((corLida >= 0 && corLida <= 100) || (corLida >= 201 && corLida <= 227)) {
            document.getElementById('inpReg').focus()
        } else {
            alert(corLida + " É um valor de ID incorreto para 'Cor'")
            document.getElementById('inpCor').value = ''
        }
        let regLida = Number(document.getElementById('inpReg').value)

    }
}
function enterCor2(e) {
    if (e.key == 'Enter') {
        let corLida = Number(document.getElementById('inpCor2').value)
        if ((corLida >= 0 && corLida <= 100) || (corLida >= 201 && corLida <= 227)) {
            document.getElementById('inpReg2').focus()
        } else {
            alert(corLida + " É um valor de ID incorreto para 'Cor'")
            document.getElementById('inpCor2').value = ''
        }
        let regLida = Number(document.getElementById('inpReg2').value)

    }
}

function enterReg(e) {
    if (e.key == 'Enter') {
        inserirCor()

    }
}
function enterReg2(e) {
    if (e.key == 'Enter') {
        let regLida2 = Number(document.getElementById('inpReg2').value)
        if (regLida2 >= 0 && regLida2 <= 5) {
            document.getElementById('inpQtd').focus()
        } else {
            alert("Região inválida")
        }

    }
}

function enterQtd(e) {
    if (e.key == 'Enter') {
        if(iDinoSelecionado != -1){
            let inpCor2 = Number(document.getElementById('inpCor2').value)
            let inpReg2 = Number(document.getElementById('inpReg2').value)
            let inpQtd = Number(document.getElementById('inpQtd').value)
            if(inpQtd >= 0 && inpQtd <= 5){
                dinos[iDinoSelecionado].cores[inpCor2].regioes[inpReg2] = inpQtd
                atualizarCores()
                document.getElementById('inpCor2').value = ""
                document.getElementById('inpReg2').value = ""
                document.getElementById('inpQtd').value = ""
                document.getElementById('inpCor2').focus()
            }else{alert("Quantidade invalida")}
        }else{alert("Selecione o dino")}
    }
}

function novaQtd() {
    document.getElementById("divAjusteQuantidade").style.display = "block"
    document.getElementById("sumirQtd").style.display = "block"
    document.getElementById("novaQtd").style.display = "none"
}

function sumirQtd() {
    document.getElementById("divAjusteQuantidade").style.display = "none"
    document.getElementById("sumirQtd").style.display = "none"
    document.getElementById("novaQtd").style.display = "block"
}

function desfazer(e) {
    if (e.ctrlKey && e.key == 'z') {
        if (dinos[iDinoSelecionado].ctrlZ.length > 0) {
            let texto = `Desfazer [${dinos[iDinoSelecionado].ctrlZ[dinos[iDinoSelecionado].ctrlZ.length - 1].corInserida}:${dinos[iDinoSelecionado].ctrlZ[dinos[iDinoSelecionado].ctrlZ.length - 1].regiaoInserida}] ?`
            if (dinos[iDinoSelecionado].ctrlZ[dinos[iDinoSelecionado].ctrlZ.length - 1].completouInserida) texto += `\nEsta ação vai descompletar a cor [${dinos[iDinoSelecionado].ctrlZ[dinos[iDinoSelecionado].ctrlZ.length - 1].corInserida}]`
            if (confirm(texto)) {
                if (dinos[iDinoSelecionado].cores[dinos[iDinoSelecionado].ctrlZ[dinos[iDinoSelecionado].ctrlZ.length - 1].corInserida].regioes[dinos[iDinoSelecionado].ctrlZ[dinos[iDinoSelecionado].ctrlZ.length - 1].regiaoInserida] != 0) {
                    dinos[iDinoSelecionado].cores[dinos[iDinoSelecionado].ctrlZ[dinos[iDinoSelecionado].ctrlZ.length - 1].corInserida].regioes[dinos[iDinoSelecionado].ctrlZ[dinos[iDinoSelecionado].ctrlZ.length - 1].regiaoInserida]--
                    dinos[iDinoSelecionado].cores[dinos[iDinoSelecionado].ctrlZ[dinos[iDinoSelecionado].ctrlZ.length - 1].corInserida].completa = false
                    dinos[iDinoSelecionado].ctrlZ.pop()
                    atualizarCores()
                    document.getElementById('divResultado').style.background = "#212121"
                    document.getElementById('divResultado').innerHTML = ""
                    document.getElementById('divContainer').style.background = "#212121"
                    document.getElementById('divCorCompleta').style.visibility = "hidden"
                } else {
                    alert("Nada feito")
                    dinos[iDinoSelecionado].ctrlZ = []
                    document.getElementById('divResultado').style.background = "#212121"
                    document.getElementById('divResultado').innerHTML = ""
                    document.getElementById('divContainer').style.background = "#212121"
                }
            }
        }
    }
}

function inserirCor() {
    document.getElementById('divCorCompleta').style.visibility = 'hidden'
    document.getElementById('divFechou5').style.visibility = 'hidden'
    document.getElementById('divFechouTodos').style.visibility = 'hidden'
    let corLida = (document.getElementById('inpCor').value)
    let regLida = (document.getElementById('inpReg').value)
    if (iDinoSelecionado != -1) {
        if (corLida == "" || regLida == "") {
            alert("digita algo ai menor")
            document.getElementById('inpCor').focus()
        } else {
            corLida = Number(corLida)
            regLida = Number(regLida)

            if ((regLida >= 0 && regLida <= 5)) {

                if (dinos[iDinoSelecionado].cores[corLida].regioes[regLida] == 0) {
                    document.getElementById('divResultado').style.background = "green"
                    dinos[iDinoSelecionado].cores[corLida].regioes[regLida] = dinos[iDinoSelecionado].cores[corLida].regioes[regLida] + 1
                    // console.log(cores[corLida].regioes);
                    let completouAgora = verificarSeCompletou(corLida)
                    registrarInsercao(corLida, regLida, completouAgora)
                } else {
                    if (dinos[iDinoSelecionado].cores[corLida].regioes[regLida] < 5) {
                        document.getElementById('divResultado').style.background = "yellow"
                        dinos[iDinoSelecionado].cores[corLida].regioes[regLida]++
                        if (dinos[iDinoSelecionado].cores[corLida].regioes[regLida] == 5) { document.getElementById('divFechou5').style.visibility = 'visible' }
                        if (fechouTodos(corLida)) { document.getElementById('divFechouTodos').style.visibility = 'visible' }
                        let completouAgora = verificarSeCompletou(corLida)
                        registrarInsercao(corLida, regLida, completouAgora)
                    } else {
                        document.getElementById('divResultado').style.background = "red"
                    }
                }

                function verificarSeCompletou(cor) {
                    // console.log(cores[cor].completa)
                    if (dinos[iDinoSelecionado].cores[cor].completa == false) {
                        // console.log(cores[cor].regioes.length)
                        for (i = 0; i < dinos[iDinoSelecionado].cores[cor].regioes.length; i++) {
                            if (dinos[iDinoSelecionado].cores[cor].regioes[i] == 0) {
                                return false
                            }
                        }
                        dinos[iDinoSelecionado].cores[cor].completa = true
                        document.getElementById('divCorCompleta').style.visibility = "visible"
                        return true
                    } else {
                        return false
                    }
                }

                function registrarInsercao(cor, regiao, completouAgora) {
                    let insercao = {
                        corInserida: cor,
                        regiaoInserida: regiao,
                        completouInserida: completouAgora
                    }
                    dinos[iDinoSelecionado].ctrlZ.push(insercao)
                    // console.log(insercao)
                }


                atualizarCores()
                document.getElementById('divContainer').style.background = hexCores[corLida]

                document.getElementById('inpCor').focus()

                //*** teste
                // document.getElementById('divResultado').innerHTML = '['+ + ':'
                // document.getElementById('divResultado').innerHTML +=  + ']<br>'

                document.getElementById('divResultado').innerHTML = `<div>[${document.getElementById('inpCor').value}:${document.getElementById('inpReg').value}]</div>
    <div>Q:${dinos[iDinoSelecionado].cores[corLida].regioes[regLida]}</div>`


                //*** /teste
                document.getElementById('inpCor').value = ''
                document.getElementById('inpReg').value = ''
                // if (!dinos[iDinoSelecionado].cores[corLida].regioes.includes(0)) {
                //     // alert("ola")

                // }
            } else {
                alert(regLida + " É um valor de ID incorreto para 'Região'")
                document.getElementById('inpReg').value = ''
            }
        }
    } else { alert('Selecione o dino') }
}

function exportar() {
    let dados = JSON.stringify(dinos)
    navigator.clipboard.writeText(dados)
    alert("Dados copiados para a área de transferência")
}
function salvar() {
    let erro = false
    try {
        dinos = JSON.parse(document.getElementById('txtDados').value)
    } catch (e) {
        erro = true
        alert('Dados invalidos')
    }
    if (!erro) {
        alert("Tabela de cores atualizada")
        atualizarCores()
        document.getElementById('txtDados').value = ""
        document.getElementById('divDadosSalvos').style.display = "none"
    }
}

function importar() {
    document.getElementById('divDadosSalvos').style.display = "block"
}

function fechouTodos(cor) {
    for (i = 0; i <= 5; i++) {
        if (dinos[iDinoSelecionado].cores[cor].regioes[i] != 5) {
            return false
        }
    }
    return true
}







criarVetorHexCores()
criarVetorNomesCor()
criarTabelaDeCores()
criarVetordeCores()
atualizarCores()
document.getElementById('inpCor').focus()



// cores[1] = cor

// cor = {
//     id : 2,
//     regioes : [0,0,0,0,0,0]
// }

// cores[2] = cor

// document.getElementById("divTeste").innerHTML = JSON.stringify(cores)

// let cores2 = []
// cores2 = JSON.parse(document.getElementById("divTeste").innerHTML)
