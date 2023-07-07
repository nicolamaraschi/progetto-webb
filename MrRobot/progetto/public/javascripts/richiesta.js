class Richiesta{

    constructor(categoria, nome, descrizione){
        this.categoria = categoria;
        this.nome = nome;
        this.descrizione = descrizione;
        this.stato = "Pendente";
    }

    getCittà(){
        return this.città;
    }

    getVia(){
        return this.nome;
    }

    getDescrizione(){
        return this.descrizione;
    }

    static from(json){
        const e = Object.assign(new Richiesta(), json);
        return e;
    }

}

export default Richiesta;