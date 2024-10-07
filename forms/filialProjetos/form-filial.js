$(document).ready(function () {
    function getDataset() {
        var settings = {
            "url": "https://combioenergia.fluig.cloudtotvs.com.br/api/public/ecm/dataset/datasets",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json",
                'Authorization': 'Bearer eyJraWQiOiI1OGM3NjQzZi03NTQwLTQ4Y2YtOGVhYy01NDhiM2I4MGYxOTMiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJyYWZhZWwuYXJhdWpvIiwicm9sZSI6InVzZXIsYWRtaW4iLCJ0ZW5hbnQiOjEsInVzZXJUZW5hbnRJZCI6NDQ3LCJzaXRlQ29kZSI6IkZsdWlnIiwic2l0ZUlkIjoxLCJ1c2VyVHlwZSI6MCwidXNlclVVSUQiOiJjNWViZmI2Yy0xZDA2LTQyNDMtYjMxZi1iZTkwOGJlNjY5NjciLCJ0ZW5hbnRVVUlEIjoiNThjNzY0M2YtNzU0MC00OGNmLThlYWMtNTQ4YjNiODBmMTkzIiwibGFzdFVwZGF0ZURhdGUiOjE3MjI1MTgwMTYwMDAsInVzZXJUaW1lWm9uZSI6IkFtZXJpY2EvU2FvX1BhdWxvIiwiZXhwIjoxNzI3NDU1OTE1LCJpYXQiOjE3Mjc0NTQ3MTUsImF1ZCI6ImZsdWlnX2F1dGhlbnRpY2F0b3JfcmVzb3VyY2UifQ.e5X04SlYuPgiQw4y8KGw-8VDG3V5V0leWXQOi-BYCVd27ELNtkb5i48AOfnLfe-cV-zKilF7le--LlqZ3xuMM_O3UdRN6dm5zl29bXgiv4VA0gnbcqt_6Po2PjvbtZOnY4blTTWzOFVzfzDjLthDVgBTNGyH07v1UytiEYq4hGF_5vwH30SwMa4OQhYBkyIBUDRvQFODqqleJdYxu47MsxeX1fnfPnFDmjBv6yUWMpGoxz8Nl4S4Z-5OzEvOv-693Ou3xcEixfg7FhOTv-OVrx0gumKBFbN5FssPjb3cBHSPifHYNBQCtuznaOgUssaijUgDaR0VzEnkMSAS6Tibsg',
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
        