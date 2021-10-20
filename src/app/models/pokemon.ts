export interface Pokemon {
    id:number,
    name:string;
    url:string;
    results:[];
    stats:[{base_stat:number, stat:{name:string}}];
    types:[];
    
}
