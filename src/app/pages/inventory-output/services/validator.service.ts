
export const ValidatorService = {

     dateValidator(fromDate:string, toDate:string):boolean{

        return (fromDate && toDate && new Date(fromDate) >= new Date(toDate)) ? true : false;
        
    }
};