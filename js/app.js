
    const ctx = document.getElementById('myChart').getContext('2d');
    const searcher = document.querySelector('.selectpicker');
    const ui = new INTERFACE();
    const histApi = new FINANCIALAPI();
    loadListenners();
    function loadListenners(){
        document.addEventListener('DOMContentLoaded', options);
        $('.selectpicker').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
            getCompanieSelected(clickedIndex);
        });
        
    }



    const chart = new Chart(ctx, {
    // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'My First dataset',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 91, 132)',
                data: [0, 10, 5, 2, 20, 30, 45]
            }]
        },

        // Configuration options go here
        options: {}
    });


    // !Funcitions
    function options(){
        ui.addOptions();
    }


    function getCompanieSelected(clickedIndex){
        const picker = document.querySelector('.selectpicker');
        const companieSelected = picker.options[clickedIndex].value;
        histApi.getFinanceInformation(companieSelected);
    }
