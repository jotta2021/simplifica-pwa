export default function formatCurrency(value:number){
    if(value){
        return value.toLocaleString('pt-BR',{currency:'BRL', style:'currency'})
    }
    return "R$ 0,00"
}