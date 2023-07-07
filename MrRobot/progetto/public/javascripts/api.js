import Richiesta from "./richiesta.js";

class Api{
    
    // Api per visualizzare le richieste nella pagina principale
    //fa una chiamata all'API "api/indexRequests" per recuperare tutte le richieste presenti nel sistema.
    static getIndexRequests = async() =>{
        let response = await fetch('api/indexRequests');
        const requestsJson = await response.json();
        
        if(response.ok){
            return requestsJson.map((rq) => Richiesta.from(rq));
        }
        else throw requestsJson;
    }

    // Api per visualizzare le richieste all utente
    static getRequests = async() =>{
    let response = await fetch('api/userRequests');
    const requestsJson = await response.json();
    if(response.ok){
        return requestsJson.map((rq) => Richiesta.from(rq));
    }else throw requestsJson;
    }

    // Api per visualizzare le richieste all Admin
    static getAdminRequests = async() =>{
        let response = await fetch('api/adminRequests');
        const requestsJson = await response.json();
        if(response.ok){
            return requestsJson.map((rq) => Richiesta.from(rq));
        }else throw requestsJson;
    }

    // Api oer effettuare il login dell'admin
    // Questo metodo richiede un nome utente e una password come input e invia una richiesta POST all'API "api/adminLogin" per autenticare l'utente. 

    static adminLogin = async(username, password) =>{
        let response = await fetch('api/adminLogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password}),
        });
        // Se la richiesta ha successo, restituisce il nome utente dell'amministratore. 
        if(response.ok){
            const username = await response.json();
            return username;
        }else{
            // In caso contrario, gestisce l'errore e restituisce un messaggio di errore appropriato. 
            try{
                const errDetail = await response.json();
                throw errDetail.message;
            }catch(err){
                throw err;
            }
        }
    }
    
    // Api per effettuare il login dell'utente
    // Questa funzione effettua una richiesta POST all'endpoint 'api/adminLogin' per autenticare l'utente. 
    // Vengono passati come parametri il nome utente e la password, che vengono inviati come corpo della richiesta in formato JSON.  
    static userLogin = async(username, password)=>{
        
        let response = await fetch('api/adminLogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password}),
        });
        // Se la risposta è positiva, viene restituito il nome utente dell'utente autenticato. 
        if(response.ok){
            const username = await response.json();
            return username;
        // In caso contrario, viene lanciata un'eccezione con il messaggio di errore restituito dal server.
        }else{
            try{
                const errDetail = await response.json();
                throw errDetail.message;
            }catch(err){
                throw err;
            }
        }
    }

    //Api per effettuare il logout
    static doLogout = async () => {
        await fetch('api/session/current', {method : 'DELETE'})
    }


}

export default Api;