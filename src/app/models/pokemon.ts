export interface Pokemon {

    name:string;
    url:string;
    results:[];
    stats:[{base_stat:number, stat:{name:string}}];
    types:[];
    
}
