
let cores = []

function criarVetorPrincipal(){
    for(i=0; i<=227; i++){
        let cor = {
            regioes : [0,0,0,0,0,0],
            completa : 0
        }
        cores.push(cor)
    }
    
}

function atualizarCores(){
    for(i=1; i<=227; i++){
        if(i<=100 || i>=201){
            document.getElementById('cor'+i).innerHTML = i + ' ' + nomesCores[i] + ' |' 
            for(j=0;j<=5;j++){
                document.getElementById('cor'+i).innerHTML += `${j}:${cores[i].regioes[j]}|`

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
            if(coresEscuras.includes(i)){
                document.getElementById("cor"+i).style.color = 'white'
            }else{
                document.getElementById("cor"+i).style.color = 'black'
            }
        }
    }
    document.getElementById('cor2').style.background = "#0000ff"
}

document.getElementById('inpCor').addEventListener('keyup', enterCor)
document.getElementById('inpReg').addEventListener('keyup', enterReg)
document.getElementById('inpReg').addEventListener('keydown', ctrlZ)

function enterCor(e){
    if(e.key == 'Enter'){
        let corLida = Number(document.getElementById('inpCor').value)
        if((corLida>=0 && corLida<=100) || (corLida>=201 && corLida<=227)){
            document.getElementById('inpReg').focus()
        }else {
            alert(corLida + " é um valor de ID incorreto para 'Cor'")
            document.getElementById('inpCor').value = ''
        }
        let regLida = Number(document.getElementById('inpReg').value)

    }
}

function enterReg(e){
    if(e.key == 'Enter'){
        inserirCor()
        
    }
}

function ctrlZ(e){
    if (e.ctrlKey && e.key === 'z'){
        apagarUltimo
    }
}

function apagarUltimo(){
    if(document.getElementById('divResultado').style.background = "green"){
        cores[corLida].regioes[regLida] = cores[corLida].regioes[regLida] - 1
        console.log(cores[corLida].regioes);
    }
}

function  inserirCor(){
    document.getElementById('divCorCompleta').style.visibility = 'hidden'
    document.getElementById('divFechou5').style.visibility = 'hidden'
    document.getElementById('divFechouTodos').style.visibility = 'hidden'
    let corLida = Number(document.getElementById('inpCor').value)
    let regLida = Number(document.getElementById('inpReg').value)
    
    
    if((regLida>=0 && regLida<=5)){
    
    console.log(corLida);
    if(cores[corLida].regioes[regLida] == 0){
        document.getElementById('divResultado').style.background = "green"
        cores[corLida].regioes[regLida] = cores[corLida].regioes[regLida] + 1
        console.log(cores[corLida].regioes);
        // document.getElementById('divCorCompleta').style.visibility = 'visible'
    }else{
        if(cores[corLida].regioes[regLida] < 5){
            document.getElementById('divResultado').style.background = "yellow"
            cores[corLida].regioes[regLida]++            
        if(cores[corLida].regioes[regLida] == 5){document.getElementById('divFechou5').style.visibility = 'visible'}
        if(fechouTodos(corLida)){document.getElementById('divFechouTodos').style.visibility = 'visible'}
        }else{
            document.getElementById('divResultado').style.background = "red"
        }
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
    if(!cores[corLida].regioes.includes(0)){
        // alert("ola")

    }
}else {
    alert(regLida + " é um valor de ID incorreto para 'Região'")
        document.getElementById('inpReg').value = ''
    }
}

function exportar(){
    let dados = JSON.stringify(cores)
    // document.getElementById('txtDados').innerText = dados
    document.getElementById('txtDados').value = dados
    navigator.clipboard.writeText(dados)
    alert("Dados copiados para a área de transferência")
}

function importar(){
    cores = JSON.parse(document.getElementById('txtDados').value)
    atualizarCores()
}

function fechouTodos(cor){
    for(i=0; i<=5; i++){
        if(cores[cor].regioes[i] != 5){
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
