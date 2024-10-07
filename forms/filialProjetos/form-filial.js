$(document).ready(function () {
    function getDataset() {
        var settings = {
            "url": "https://combioenergia.fluig.cloudtotvs.com.br/api/public/ecm/dataset/datasets",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ***REMOVED***',
                "Cookie": "JSESSIONID=seu-cookie"
            },
            "data": JSON.stringify({
                "name": "ds_estabelecimento",
                "constraints": []
            }),
        };

        $.ajax(settings).done(function (response) {
            let options = '';
            response.content.values.forEach(function (item) {
                options += `<option value="${item.ESTABELECIMENTO}">${item.ESTABELECIMENTO} - ${item.NOME_FANTASIA} - ${item.ESTABELECIMENTO}</option>`;
            });
            $('#codigoFilial').html(options);
        }).fail(function (error) {
            console.error("Erro ao buscar os estabelecimentos", error);
        });
    }

    // Chamar a função para buscar o dataset ao carregar a página
    getDataset();
});
        