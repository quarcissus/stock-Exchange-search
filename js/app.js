
    const ctx = document.getElementById('myChart').getContext('2d');
    const searcher = document.querySelector('.selectpicker');
    const ui = new INTERFACE();
    const histApi = new FINANCIALAPI();
    let companie = '';
    let x_axis = [];
    loadListenners();
    function loadListenners(){
        document.addEventListener('DOMContentLoaded', options);
        $('.selectpicker').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
            companie = getCompanieSelected(clickedIndex);
            getHistorical(companie);
        });


        
    }


    
    


    // !Funcitions
    function options(){
        ui.addOptions();
    }


    function getCompanieSelected(clickedIndex){
        const picker = document.querySelector('.selectpicker');
        const companieSelected = picker.options[clickedIndex].value;
        return companieSelected;
    }

    function getHistorical( companie ){
        let days = [];
        let dailyVal = [];
        histApi.getFinanceInformation(companie).
            then(response =>{
                const companieHistFinance = response.historical;
                companieHistFinance.forEach((daily_info)=>{
                    days.push(daily_info.date);
                    dailyVal.push(daily_info.close);
                });
                printChart(days, dailyVal);
                
            });
        
    }

    function printChart(days, dailyVal){
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: days,
                datasets: [{
                    label: 'Stock exchange',
                    borderColor: '#4F5F82',
                    data: dailyVal
                }]
            },
    
            // Configuration options go here
            options: {
                scales:{
                    yAxes: [
                        {
                            ticks:{
                                callback: function(value, index, values){
                                    return '$'+ value;
                                }
                            }
                        },
                    ]
                }
            }
        });
    }
