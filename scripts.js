var NumerodoPiloto = document.querySelector('#driver_number');
var campos = ['broadcast_name', 'full_name', 'name_acronym', 'team_colour', 'first_name', 'last_name', 'country_code'];

function atualizarDados() {
    let NumberPilot = NumerodoPiloto.value.toString(); // Convertendo para string
    let requestURL = 'https://api.openf1.org/v1/drivers?driver_number=' + NumberPilot + '&session_key=9158';
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.send();
    request.onload = function () {
        if (request.status === 200) { // Verifica se a solicitação foi bem-sucedida
            let resposta = request.responseText; // Usar responseText para obter os dados
            atualizarCamposDoFormulario(resposta);
        } else {
            console.error('Erro ao carregar dados. Status da resposta:', request.status);
        }
    }
}

function atualizarCamposDoFormulario(dadosJson) {
    let dados = JSON.parse(dadosJson);
    campos.forEach(item => {
        document.getElementById(item).value = dados[0][item];
        let imgElement = document.getElementById('headshot');
        imgElement.src = dados[0]['headshot_url'];
    });
}

NumerodoPiloto.addEventListener('change', atualizarDados);
