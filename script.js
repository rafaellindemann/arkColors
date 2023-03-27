
let cores = []
let ctrlZ = []

function criarVetorPrincipal() {
    for (i = 0; i <= 227; i++) {
        let cor = {
            regioes: [0, 0, 0, 0, 0, 0],
            completa: false
        }
        cores.push(cor)
    }

}

function atualizarCores() {
    for (i = 1; i <= 227; i++) {
        if (i <= 100 || i >= 201) {
            document.getElementById('cor' + i).innerHTML = i + ' ' + nomesCores[i] + ' |'
            for (j = 0; j <= 5; j++) {
                document.getElementById('cor' + i).innerHTML += `${j}:${cores[i].regioes[j]}|`

            }
        }
    }
    atualizarCoresCompletas()
}

function atualizarCoresCompletas(){
    let coresCompletas = []
    for(i=1; i < cores.length ; i++){
        if(cores[i].completa == true){
            coresCompletas.push(i)
        }
    }
    document.getElementById('divCoresCompletas').innerHTML = "Lista de cores completas: " + coresCompletas  
}

divCores = document.getElementById("divCores")

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
document.body.addEventListener('keydown', desfazer)
document.getElementById('inpCor').focus()

function enterCor(e) {
    if (e.key == 'Enter') {
        let corLida = Number(document.getElementById('inpCor').value)
        if ((corLida >= 0 && corLida <= 100) || (corLida >= 201 && corLida <= 227)) {
            document.getElementById('inpReg').focus()
        } else {
            alert(corLida + " é um valor de ID incorreto para 'Cor'")
            document.getElementById('inpCor').value = ''
        }
        let regLida = Number(document.getElementById('inpReg').value)

    }
}

function enterReg(e) {
    if (e.key == 'Enter') {
        inserirCor()

    }
}

function desfazer(e) {
    if (e.ctrlKey && e.key == 'z') {
        if (ctrlZ.length > 0) {
            let texto = `Desfazer [${ctrlZ[ctrlZ.length - 1].corInserida}:${ctrlZ[ctrlZ.length - 1].regiaoInserida}] ?`
            if (ctrlZ[ctrlZ.length - 1].completouInserida) texto += `\nEsta ação vai descompletar a cor [${ctrlZ[ctrlZ.length - 1].corInserida}]`
            if (confirm(texto)) {
                if (cores[ctrlZ[ctrlZ.length - 1].corInserida].regioes[ctrlZ[ctrlZ.length - 1].regiaoInserida] != 0) {
                    cores[ctrlZ[ctrlZ.length - 1].corInserida].regioes[ctrlZ[ctrlZ.length - 1].regiaoInserida]--
                    cores[ctrlZ[ctrlZ.length - 1].corInserida].completa = false
                    ctrlZ.pop()
                    atualizarCores()
                    document.getElementById('divResultado').style.background = "#212121"
                    document.getElementById('divResultado').innerHTML = ""
                    document.getElementById('divContainer').style.background = "#212121"
                    document.getElementById('divCorCompleta').style.visibility = "hidden"
                } else {
                    alert("nada feito")
                    ctrlZ = []
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
    if (corLida == "" || regLida == "") {
        alert("digita algo ai menor")
        document.getElementById('inpCor').focus()
    } else {
        corLida = Number(corLida)
        regLida = Number(regLida)

        if ((regLida >= 0 && regLida <= 5)) {

            // console.log(corLida);
            if (cores[corLida].regioes[regLida] == 0) {
                document.getElementById('divResultado').style.background = "green"
                cores[corLida].regioes[regLida] = cores[corLida].regioes[regLida] + 1
                // console.log(cores[corLida].regioes);
                let completouAgora = verificarSeCompletou(corLida)
                registrarInsercao(corLida, regLida, completouAgora)
            } else {
                if (cores[corLida].regioes[regLida] < 5) {
                    document.getElementById('divResultado').style.background = "yellow"
                    cores[corLida].regioes[regLida]++
                    if (cores[corLida].regioes[regLida] == 5) { document.getElementById('divFechou5').style.visibility = 'visible' }
                    if (fechouTodos(corLida)) { document.getElementById('divFechouTodos').style.visibility = 'visible' }
                    let completouAgora = verificarSeCompletou(corLida)
                    registrarInsercao(corLida, regLida, completouAgora)
                } else {
                    document.getElementById('divResultado').style.background = "red"
                }
            }

            function verificarSeCompletou(cor) {
                // console.log(cores[cor].completa)
                if (cores[cor].completa == false) {
                    // console.log(cores[cor].regioes.length)
                    for (i = 0; i < cores[cor].regioes.length; i++) {
                        if (cores[cor].regioes[i] == 0) {
                            return false
                        }
                    }
                    cores[cor].completa = true
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
                ctrlZ.push(insercao)
                // console.log(insercao)
            }


            atualizarCores()
            document.getElementById('divContainer').style.background = hexCores[corLida]

            document.getElementById('inpCor').focus()

            //*** teste
            // document.getElementById('divResultado').innerHTML = '['+ + ':'
            // document.getElementById('divResultado').innerHTML +=  + ']<br>'

            document.getElementById('divResultado').innerHTML = `<div>[${document.getElementById('inpCor').value}:${document.getElementById('inpReg').value}]</div>
    <div>Q:${cores[corLida].regioes[regLida]}</div>`


            //*** /teste
            document.getElementById('inpCor').value = ''
            document.getElementById('inpReg').value = ''
            if (!cores[corLida].regioes.includes(0)) {
                // alert("ola")

            }
        } else {
            alert(regLida + " é um valor de ID incorreto para 'Região'")
            document.getElementById('inpReg').value = ''
        }
    }
}

function exportar() {
    let dados = JSON.stringify(cores)
    // document.getElementById('txtDados').innerText = dados
    document.getElementById('txtDados').value = dados
    navigator.clipboard.writeText(dados)
    alert("Dados copiados para a área de transferência")
}

function importar() {
    cores = JSON.parse(document.getElementById('txtDados').value)
    atualizarCores()
}

function fechouTodos(cor) {
    for (i = 0; i <= 5; i++) {
        if (cores[cor].regioes[i] != 5) {
            return false
        }
    }
    return true
}




criarVetorHexCores()
criarVetorNomesCor()
criarTabelaDeCores()
criarVetorPrincipal()
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
