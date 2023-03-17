
let cores = []

function  inserirCor(){
    let corLida = Number(document.getElementById('inpCor').value)
    let regLida = Number(document.getElementById('inpReg').value)
    
    console.log(corLida);
    if(cores[corLida].regioes[regLida] == 0){
        document.getElementById('divResultado').style.background = "green"
        cores[corLida].regioes[regLida] = cores[corLida].regioes[regLida] + 1
        console.log(cores[corLida].regioes);
    }else{
        if(cores[corLida].regioes[regLida] < 5){
            document.getElementById('divResultado').style.background = "yellow"
            cores[corLida].regioes[regLida]++
        }else{
            document.getElementById('divResultado').style.background = "red"
        }
    }
    atualizarCores()
}

function criarVetorPrincipal(){
    for(i=0; i<=227; i++){
        let cor = {
            regioes : [0,0,0,0,0,0]
        }
        cores.push(cor)
    }
    
}

function atualizarCores(){
    for(i=1; i<=227; i++){
        if(i<=100 || i>=201){
            document.getElementById('cor'+i).innerHTML = i + ' | ' + nomesCores[i] + ' || ' 
            for(j=0;j<=5;j++){
                document.getElementById('cor'+i).innerHTML += `${j}:${cores[i].regioes[j]} - `

            }
        }
    }
}

divCores = document.getElementById("divCores")

function criarTabelaDeCores(){
    for(i=1; i<=227; i++){
        if(i<=100 || i>200){
            let id = "cor"+i
            divCores.innerHTML += `<div id=${id} class="divCor">${nomesCores[i]}</div>`
            document.getElementById("cor"+i).style.background = hexCores[i]
        }
    }
    document.getElementById('cor2').style.background = "#0000ff"
}

document.getElementById('inpCor').addEventListener('keyup', enterCor)
document.getElementById('inpReg').addEventListener('keyup', enterReg)

function enterCor(e){
    if(e.key == 'Enter'){
        document.getElementById('inpReg').focus()
    }
}

function enterReg(e){
    if(e.key == 'Enter'){
        inserirCor()
        document.getElementById('inpCor').focus()
        
        //*** teste
        document.getElementById('divResultado').innerHTML = document.getElementById('inpCor').value + '<br>'
        document.getElementById('divResultado').innerHTML += document.getElementById('inpReg').value + '<br>'
        //*** /teste
        document.getElementById('inpCor').value = ''
        document.getElementById('inpReg').value = ''

    }
}


criarVetorHexCores()
criarVetorNomesCor()
criarTabelaDeCores()
criarVetorPrincipal()
atualizarCores()



// cores[1] = cor

// cor = {
//     id : 2,
//     regioes : [0,0,0,0,0,0]
// }

// cores[2] = cor

// document.getElementById("divTeste").innerHTML = JSON.stringify(cores)

// let cores2 = []
// cores2 = JSON.parse(document.getElementById("divTeste").innerHTML)