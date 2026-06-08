// CARREGAR CLIMA
async function carregarClima(){
    try{
        const latitude = -25.916;
        const longitude = -53.470;

        const resposta = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=America/Sao_Paulo`
        );

        const dados = await resposta.json();
        const clima = dados.current_weather;

        document.getElementById("temp").innerText = clima.temperature;
        document.getElementById("vento").innerText = clima.windspeed;

    }catch{
        document.getElementById("temp").innerText = "--";
        document.getElementById("vento").innerText = "--";
    }
}

// RELÓGIO
function atualizarRelogio(){
    const agora = new Date();
    document.getElementById("relogio").innerText =
        agora.toLocaleTimeString("pt-BR");
}

// ESTAÇÃO DO ANO
function atualizarEstacao(){
    const hoje = new Date();
    const mes = hoje.getMonth() + 1;
    const dia = hoje.getDate();

    let estacao;

    if((mes == 12 && dia >= 21) || (mes <= 2) || (mes == 3 && dia < 20)){
        estacao = "☀️ Verão";
    }
    else if((mes == 3 && dia >= 20) || (mes <= 5) || (mes == 6 && dia < 21)){
        estacao = "🍂 Outono";
    }
    else if((mes == 6 && dia >= 21) || (mes <= 8) || (mes == 9 && dia < 23)){
        estacao = "❄️ Inverno";
    }
    else{
        estacao = "🌸 Primavera";
    }

    document.getElementById("estacao").innerText = estacao;
}

// STATUS DO MERCADO
function atualizarStatus(){
    const hora = new Date().getHours();
    const mercado = (hora >= 8 && hora < 18) ? "● Mercado Aberto" : "● Mercado Fechado";
    document.getElementById("status").innerText = mercado;
}

// INICIALIZAÇÃO
carregarClima();
atualizarEstacao();
atualizarRelogio();
atualizarStatus();

// INTERVALOS
setInterval(atualizarRelogio, 1000);
setInterval(carregarClima, 600000); // Atualiza clima a cada 10 min
setInterval(atualizarStatus, 60000); // Atualiza status a cada minuto
