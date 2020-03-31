

class INTERFACE{
    constructor(){
        
        this.api = new API();

    }

    loadListenners(){
        const searcher = document.getElementById('companie_search');
        searcher.addEventListener('input', this.selectCompanie);
    }

    // !Listenners functions
    
    selectCompanie(companieSearch){
        if(companieSearch.length > 3){
            return this.filterCompanies(companieSearch);
        }
    }

    filterCompanies(companie){
        this.api.getCompaniesInformation()
            .then(companies =>{
                const companiesSelected = companies.filter( data =>{
                    return data[1].toLowerCase().indexOf(companie) !== -1

                });
                return companiesSelected;
            });
    }

    addOptions(){
        const picker = document.querySelector('.selectpicker');
        this.api.getCompaniesInformation()
            .then(companies =>{
                companies.forEach((companie)=>{
                    const option = document.createElement('option');
                    option.setAttribute('data-tokens', companie[1]);
                    option.setAttribute('value', companie[0]);
                    option.appendChild(document.createTextNode(companie[1]));
                    picker.appendChild(option);
                });

            })
    }

}