//Data https://pkgstore.datahub.io/core/nasdaq-listings/nasdaq-listed-symbols_csv/data/595a1f263719c09a8a0b4a64f17112c6/nasdaq-listed-symbols_csv.csv

class API{
    async getCompaniesInformation(){
        const response = await fetch('./listed_symbols.csv');
        
        const data = await response.text();
        const companiesTable = data.split('\n').slice(1);
        const companies = [];
        companiesTable.forEach((companie)=>{
            const companieInfo  = companie.split(',');
            if( companieInfo.length > 2 ){
                companieInfo.pop();
            }

            if(companieInfo[1][0] === '"'){
                companieInfo[1] = companieInfo[1].slice(1);
            }
            
            const symbol = companieInfo[0];
            const companieName = companieInfo[1];
            companies.push([symbol, companieName]);
            
        });
        return companies;
    }


    async getCompanieFinancial(companie){

        const companieValue = await fetch(`https://financialmodelingprep.com/api/v3/historical-price-full/${companie}`);
        const dataCompanie = await companieValue.json();
        const companieFinanceInformation =[];
        const companieDaily = dataCompanie.historical;

        companieDaily.forEach((dailyValues)=>{
            let companieDailyValue = dailyValues.close;
            let day = dailyValues.date; 
            companieFinanceInformation.push([day, companieDailyValue]);
        });

        return companieFinanceInformation
    }
}
