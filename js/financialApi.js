class FINANCIALAPI{
    async getFinanceInformation(companie){
        const response = await fetch(`https://financialmodelingprep.com/api/v3/historical-price-full/${companie}`)
        const financeHist = await response.json();
        console.log(financeHist);
    }
}