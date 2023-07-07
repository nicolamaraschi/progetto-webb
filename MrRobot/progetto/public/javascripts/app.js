import Api from './api.js';
import {createUserNavbar, createIndexnavbar} from './templates/navbar-tmplt.js';
import { createSingleRequest, createAdminRequest, createAdminRequestSoddisfatta} from './templates/request-tmpl.js';
import { createUserSections,insertrequestSuccess} from './templates/userPage-tmplt.js';
import { createIndexSections } from './templates/index-tmpl.js';
import { createAdminSections } from './templates/adminPage-tmplt.js';
import { createUserLogin, createAdminLogin, createUserRegister } from './templates/access-tmpl.js';
import { nullError, indexNullResponse, userRequestAlreadyInDB, errorInDB, loginError, adminLoginError, notLogged,emailError,passwordError} from './templates/error-tmpl.js';
import Richiesta from "./richiesta.js";
import page from '//unpkg.com/page/page.mjs';



class App{
    constructor(navbar, innerDiv) {
  this.innerDiv = innerDiv;
  this.navbar = navbar;

  const renderPage = (navbarContent, innerDivContent, eventHandlers) => {
    this.navbar.innerHTML = '';
    this.innerDiv.innerHTML = '';

    this.navbar.insertAdjacentHTML('beforeend', navbarContent);
    this.innerDiv.insertAdjacentHTML('beforeend', innerDivContent);

    for (const { elementId, eventType, handler } of eventHandlers) {
      document.getElementById(elementId).addEventListener(eventType, handler);
    }
  };

  const renderIndexPage = () => {
    renderPage(
      createIndexnavbar(),
      createIndexSections(),
      [
        { elementId: 'generalUserSearch', eventType: 'click', handler: handleIndexSearch }
      ]
    );

    this.indexShowRequests();
  };

  const renderUserPage = () => {
    renderPage(
      createUserNavbar(),
      createUserSections(),
      [
        { elementId: 'userRequestsubmit', eventType: 'click', handler: handleUserNewRequest }
      ]
    );

    this.showUserRequests();
  };

  const renderUserLoginPage = () => {
    renderPage(
      '',
      createUserLogin(),
      [
        { elementId: 'userLoginButton', eventType: 'click', handler: handleUserLogin }
      ]
    );
  };

  const renderAdminPage = () => {
    renderPage(
      createUserNavbar(),
      createAdminSections(),
      []
    );

    this.adminGetRequests();
  };

  const renderAdminLoginPage = () => {
    renderPage(
      '',
      createAdminLogin(),
      [
        { elementId: 'adminLoginButton', eventType: 'click', handler: handleAdminLogin }
      ]
    );
  };

  const renderRegisterPage = () => {
    renderPage(
      '',
      createUserRegister(),
      [
        { elementId: 'userRegister', eventType: 'click', handler: handleUserRegister }
      ]
    );
  };

  const handleIndexSearch = async (event) => {
    event.preventDefault();
    this.indexSearch(event);
  };

  const handleUserNewRequest = async (event) => {
    event.preventDefault();
    this.userNewRequest(event);
  };

  const handleUserLogin = async (event) => {
    event.preventDefault();
    this.userLogin();
  };

  const handleAdminLogin = async (event) => {
    event.preventDefault();
    this.adminLogin();
  };

  const handleUserRegister = async (event) => {
    event.preventDefault();
    this.userRegister();
  };

  const handleLogout = async () => {
    await Api.doLogout();
    page.redirect('/');
  };

  page('/', renderIndexPage);
  page('/user', renderUserPage);
  page('/userLogin', renderUserLoginPage);
  page('/admin', renderAdminPage);
  page('/adminLogin', renderAdminLoginPage);
  page('/register', renderRegisterPage);
  page('/logout', handleLogout);
  page();
}

// FUNZIONE PER LOGGARE ADMIN
adminLogin = async () => {
  // Ottieni i valori dei campi input della città e dell'admin ID
  const nome = document.getElementById("inputCategoria").value; // commento: ottengo il valore del campo input della categoria
  const adminId = document.getElementById("adminId").value; //  ottengo il valore del campo input dell'ID admin
   try {
    // Effettua il login dell'amministratore inviando i dati all'API tramite la funzione adminLogin
    const admin = await Api.adminLogin(nome, adminId); //  chiamo la funzione adminLogin dell'API passando i dati della categoria e dell'ID admin
     // Se il login ha successo, reindirizza l'utente sulla pagina dell'admin
    page.redirect('/admin'); //  reindirizzo l'utente alla pagina dell'admin
  } catch (error) {
    if (error) {
      if (document.getElementById("loginErr") == undefined) {
        // Mostra un messaggio di errore se il login non ha successo
        const errMsg = adminLoginError(); // chiamo la funzione adminLoginError per mostrare un messaggio di errore
        const loginErr = document.getElementById("innerDiv");
        loginErr.insertAdjacentHTML('afterend', errMsg); //  aggiungo il messaggio di errore al DOM
        // Imposto una durata al messaggio di errore
        setTimeout(function() {
          let generalDivRef = document.getElementById("generalDiv");
          generalDivRef.removeChild(document.getElementById("loginErr")); //  rimuovo il messaggio di errore dal DOM dopo un secondo
        }, 1000);
      }
    }
  }
}

// FUNZIONE PER LOGGARE L'UTENTE
userLogin = async () => {
  // Ottieni i valori dei campi input dell'email e della password
  const email = document.getElementById("emailForm").value; // ottengo il valore del campo input dell'email
  const psw = document.getElementById("passwordForm").value; // ottengo il valore del campo input della password
   try {
    // Effettua il login dell'utente inviando i dati all'API tramite la funzione userLogin
    const user = await Api.userLogin(email, psw); //  chiamo la funzione userLogin dell'API passando i dati dell'email e della password
     // Se il login ha successo, reindirizza l'utente alla pagina dello user
    page.redirect('/user'); // reindirizzo l'utente alla pagina dello user
  } catch (error) {
    if (error) {
      if (document.getElementById("loginErr") == undefined) {
        // Mostra un messaggio di errore se il login non ha successo
        const errMsg = loginError(); //  chiamo la funzione loginError per mostrare un messaggio di errore
        const loginErr = document.getElementById("innerDiv");
        loginErr.insertAdjacentHTML('afterend', errMsg); //  aggiungo il messaggio di errore al DOM
        setTimeout(function() {
          let generalDivRef = document.getElementById("generalDiv");
          generalDivRef.removeChild(document.getElementById("loginErr")); // rimuovo il messaggio di errore dal DOM dopo un secondo
        }, 1000);
      }
    }
  }
}


    // Funzione che gestisce la registrazione dell'utente.
userRegister = async event => {
  try {
    // Recuperiamo i valori dei campi di input.
    const nome = document.getElementById("inputName").value;
    const cognome = document.getElementById("inputSurname").value;
    const email = document.getElementById("inputEmail").value;
    const psw = document.getElementById("password").value;
    const confermaPsw = document.getElementById("confermaPassword").value;

    // Verifichiamo che tutti i campi siano stati compilati.
    if (nome === '' || cognome === '' || email === '' || psw === '' || confermaPsw === '') {
      const registerDiv = document.getElementById("registerDiv");

      // Se non tutti i campi sono stati compilati, mostriamo un messaggio di errore.
      if (document.getElementById("nullError") == undefined) {
        const nullErrorRegister = nullError();
        registerDiv.insertAdjacentHTML('beforeend', nullErrorRegister);

        // Facciamo scomparire l'errore dopo un secondo.
        setTimeout(function () {
          let registerDivRef = document.getElementById("registerDiv");
          registerDivRef.removeChild(document.getElementById("nullError"));
        }, 1000);
      }
      return;
    }
    // Verifichiamo che la password e la conferma della password siano uguali.
    if (psw === confermaPsw) {
      // Verifichiamo che la password abbia almeno 6 caratteri, una lettera maiuscola e un numero.
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
      if (!passwordRegex.test(psw)) {
        const registerDiv = document.getElementById("registerDiv");

        // Se la password non soddisfa i requisiti, mostriamo un messaggio di errore.
        if (document.getElementById("passwordError") == undefined) {
          const passwordErrorRegister = passwordError();
          registerDiv.insertAdjacentHTML('beforeend', passwordErrorRegister);

          // Facciamo scomparire l'errore dopo un secondo.
          setTimeout(function () {
            let registerDivRef = document.getElementById("registerDiv");
            registerDivRef.removeChild(document.getElementById("passwordError"));
          }, 4000);
        }
        return;
      }

      // Verifichiamo che l'email sia nel formato corretto.
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        const registerDiv = document.getElementById("registerDiv");

        // Se l'email non è nel formato corretto, mostriamo un messaggio di errore.
        if (document.getElementById("emailError") == undefined) {
          const emailErrorRegister = emailError();
          registerDiv.insertAdjacentHTML('beforeend', emailErrorRegister);

          // Facciamo scomparire l'errore dopo un secondo.
          setTimeout(function () {
            let registerDivRef = document.getElementById("registerDiv");
            registerDivRef.removeChild(document.getElementById("emailError"));
          }, 1000);
        }
        return;
      }

      const utente = {
        nome: nome,
        cognome: cognome,
        email: email,
        psw: psw,
      }

      // Effettuiamo una richiesta POST al server per registrare l'utente.
      let response = (await fetch("/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(utente)
      }));

      // Se la registrazione è avvenuta con successo, reindirizziamo l'utente alla pagina di login.
      if (response.ok) {
        page.redirect('/userLogin');
      }
      // Se la registrazione non è stata effettuata, mostriamo un messaggio di errore.
      else if (response.status < 200 || response.status > 299) {
        const registerDiv = document.getElementById("registerDiv");
        const errorDb = errorInDB();
        registerDiv.insertAdjacentHTML('beforeend', errorDb);
        // Reindirizziamo alla pagina principale in caso di errore.
        page.redirect('/');
      }
    }
  } catch (error) {
    // Se si verifica un errore durante la registrazione, lanciamo un'eccezione e reindirizziamo alla pagina principale.
    console.error(`Registration error: ${error.message}`);
    page.redirect('/');
  }
}





    // ADMIN VISUALLIZZA TUTTI I PRODOTTI NEL DB
    adminGetRequests = async()=>{
        const requests = await Api.getAdminRequests();
        const requestsPendentiSection = document.getElementById("pendenti");
        const requestSoddisfattaSection = document.getElementById("soddisfatte");

        for(let request of requests){
            if(request.stato == "Pendente"){
                const singleRequest = createAdminRequest(request);
                requestsPendentiSection.insertAdjacentHTML('beforeend', singleRequest);                
            }else if(request.stato == "Soddisfatta"){
                const singleRequest = createAdminRequestSoddisfatta(request);
                requestSoddisfattaSection.insertAdjacentHTML('beforeend', singleRequest);
            }
        }
        const userBtns = document.querySelectorAll('.userBtn');
        for(let i = 0; i < userBtns.length; i++){
            userBtns[i].addEventListener('click', this.gestoreAdminRequest.bind(this));
        }
    }
      
    // INSERIMENTO UTENTE LOGGATO NUOVO PRODOTTO 
    userNewRequest = async event => {
      // Ottiene i valori di input dalla pagina HTML
      const inputCate = document.getElementById("inputCategoria").value;
      const cateTemp = inputCate.trim();
      const inputNome = document.getElementById("inputNome").value;
      const nome = inputNome.trim();
      const inputDescrizione = document.getElementById("inputDescrizione").value;
      const submitReqSection = document.getElementById("formRequest");
    
      // Verifica se uno dei campi di input è vuoto
      if (inputCate === '' || inputNome === '' || inputDescrizione === '') {
        // Mostra un messaggio di errore se i campi sono vuoti
        if (!document.getElementById("nullError")) {
          const indexError = nullError();
          submitReqSection.insertAdjacentHTML('beforebegin', indexError);
        }
        // Rimuove il messaggio di errore dopo un certo intervallo di tempo
        setTimeout(function () {
          const generalDivRef = document.getElementById("requestSubmitSection");
          const nullErrorRef = document.getElementById("nullError");
          generalDivRef.removeChild(nullErrorRef);
        }, 1500);
        return;
      } else {
        // Crea un oggetto "request" con i dati inseriti dall'utente
        const request = {
          categoria: cateTemp,
          nome: nome,
          descrizione: inputDescrizione,
          stato: "Pendente"
        };
    
        // Invia la richiesta al server utilizzando l'API fetch
        const response = await fetch("/userPost", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(request)
        });
    
        // Gestisce la risposta dal server
        if (response.ok) {
          // Se la risposta è OK, rimuove eventuali messaggi di errore e mostra un messaggio di successo
          if (document.getElementById("nullResponse")) {
            document.getElementById("nullResponse").remove();
          }
          const requestInsert = insertrequestSuccess();
          if (!document.getElementById("requestInsert")) {
            submitReqSection.insertAdjacentHTML('beforebegin', requestInsert);
          }
          document.getElementById("userDisplayrequest").innerHTML = '';
    
          // Aggiorna la visualizzazione delle richieste dell'utente
          this.showUserRequests();
    
          return;
        } else if (response.status === 401) {
          // Se lo stato della risposta è 401 (Unauthorized), mostra un messaggio di errore per l'utente non autenticato
          if (document.getElementById("requestInsert")) {
            document.getElementById("requestInsert").remove();
          }
          const notLoggedIn = notLogged();
          submitReqSection.insertAdjacentHTML('beforebegin', notLoggedIn);
        } else if (response.status < 200 || response.status > 299) {
          // Se lo stato della risposta non è compreso tra 200 e 299 (successo), mostra un messaggio di errore per richiesta già presente nel database
          if (document.getElementById("requestInsert")) {
            document.getElementById("requestInsert").remove();
          }
          const requestAlreadyInDB = userRequestAlreadyInDB();
          submitReqSection.insertAdjacentHTML('beforebegin', requestAlreadyInDB);
          // Rimuove il messaggio di errore dopo un certo intervallo di tempo
          setTimeout(function () {
            const generalDivRef = document.getElementById("requestSubmitSection");
            const nullResponseRef = document.getElementById("nullResponse");
            generalDivRef.removeChild(nullResponseRef);
          }, 2000);
          return;
        }
      }
    }
    

    // FUNZIONE Admin PER GESTIRE I PRODOTTI INSERITI DA UTENTE LOGGATOì
    gestoreAdminRequest = async event => {
      var stato;
      // Ottiene i valori della categoria, del nome e della descrizione dalla pagina HTML
      const categoria = event.target.parentNode.getElementsByClassName("classeCittà")[0].innerHTML.replace(/^(Categoria:\s+)?([\s\S]+)/, "$2").trim();
      const nome = event.target.parentNode.getElementsByClassName("classeVia")[0].innerHTML.replace(/^(Nome:\s+)?([\s\S]+)/, "$2").trim();
      const descrizione = event.target.parentNode.getElementsByClassName("classeDescrizione")[0].innerHTML.replace(/^(Descrizione:\s+)?([\s\S]+)/, "$2").trim();
      
      // Determina lo stato in base alla selezione dell'utente
      if (event.target.parentNode.getElementsByClassName("selectGestioneRichiesta")[0].value == "Soddisfatta") {
        stato = "Soddisfatta";
      } else if (event.target.parentNode.getElementsByClassName("selectGestioneRichiesta")[0].value == "Rifiuta") {
        stato = "Rifiutata";
      }
    
      // Verifica se lo stato selezionato non è "In Osservazione"
      if (event.target.parentNode.getElementsByClassName("selectGestioneRichiesta")[0].value !== "In Osservazione") {
        // Crea un oggetto "request" con i dati della richiesta
        const request = {
          categoria: categoria,
          nome: nome,
          descrizione: descrizione,
          stato: stato
        }
    
        // Invia la richiesta di aggiornamento al server utilizzando l'API fetch
        let response = await fetch("/comuneUpdate", {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(request)
        });
    
        // Gestisce la risposta dal server
        if (response.ok) {
          // Se la risposta è OK, aggiorna la visualizzazione e ottiene nuovamente le richieste
          this.navbar.innerHTML = '';
          this.innerDiv.innerHTML = '';
          this.navbar.insertAdjacentHTML('beforeend', createUserNavbar());
          this.innerDiv.insertAdjacentHTML('beforeend', createAdminSections());
          this.adminGetRequests();
        } else if (response.status < 200 || response.status > 299) {
          // Se lo stato della risposta non è compreso tra 200 e 299 (successo), mostra un messaggio di errore per il database
          const requestsPendentiSection = document.getElementById("pendenti");
          const errorDb = errorInDB();
          requestsPendentiSection.insertAdjacentHTML('beforeend', errorDb);
        }
      }
    }
    
      
      // METODO PER VISUALIZZARE GLI ULTIMI 3 PRODOTTI GESTITI
    indexShowRequests = async () => {
      // Ottieni la lista dei lavori recenti dall'API
      const requests = await Api.getIndexRequests();
      
      // Seleziona l'elemento HTML in cui visualizzare i lavori recenti
      const requestsSection = document.getElementById("displayRecentWorks");
      
      // Variabile per tenere traccia del numero di lavori inseriti
      let i = 0;
      
      // Itera sui primi 3 lavori recenti
      requests.slice(0, 3).forEach(request => {
        // Crea l'HTML per ogni lavoro recente
        const singleRequest = createSingleRequest(request);
        
        // Inserisci l'HTML nell'elemento HTML di visualizzazione
        requestsSection.insertAdjacentHTML('beforeend', singleRequest);
        
        // Incrementa il contatore dei lavori inseriti
        i++;
      });
      
      // Se ci sono più di 3 lavori recenti, rimuovi gli elementi in eccesso
      if (requests.length > 3) {
        // Seleziona gli elementi HTML oltre il terzo elemento
        const excessRequests = Array.from(requestsSection.children).slice(3);
        
        // Rimuovi gli elementi in eccesso
        excessRequests.forEach(request => request.remove());
      }
    }
    

    // RICERCA PRODOTTO NEL DB
    indexSearch = async event => {
  // Ottiene i valori di input dalla pagina HTML
  const inputCate = document.getElementById("inputCategoria").value.toLowerCase();
  const inputNome = document.getElementById("inputNome").value.toLowerCase();

  const interventionSearchSection = document.getElementById("indexForm");

  // Verifica se entrambi i campi di input sono vuoti
  if (inputCate === '' && inputNome === '') {
    // Se entrambi i campi sono vuoti, mostra un messaggio di errore
    if (!document.getElementById("nullError")) {
      const indexError = nullError();
      interventionSearchSection.insertAdjacentHTML('beforebegin', indexError);
    }
    setTimeout(() => {
      const nullErrorRef = document.getElementById("nullError");
      nullErrorRef && nullErrorRef.remove();
    }, 1500);
    return;
  }

  // Crea l'URL per la ricerca utilizzando i parametri dell'input
  const url = new URL('/indexSearch', 'http://localhost:3000/');
  const params = {};

  if (inputCate !== '') {
    params.categoria = inputCate;
  }

  if (inputNome !== '') {
    params.nome = inputNome;
  }

  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

  // Effettua una richiesta GET al server per ottenere i risultati della ricerca
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Ottiene la risposta come JSON
  const requestsJson = await response.json();

  // Gestisce i diversi scenari della risposta
  if (requestsJson[0] === null) {
    // Se non ci sono risultati, mostra un messaggio di risposta vuota
    if (!document.getElementById("nullResponse")) {
      if (document.getElementById("nullError")) {
        document.getElementById("nullError").remove();
      }
      const nullResponse = indexNullResponse();
      interventionSearchSection.insertAdjacentHTML('beforebegin', nullResponse);
      setTimeout(() => {
        const nullResponseRef = document.getElementById("nullResponse");
        nullResponseRef && nullResponseRef.remove();
      }, 1500);
    }
  } else if (response.ok) {
    // Se la risposta è OK, mostra i risultati nella sezione di ricerca
    const nullErrorRef = document.getElementById("nullError");
    const nullResponseRef = document.getElementById("nullResponse");
    nullErrorRef && nullErrorRef.remove();
    nullResponseRef && nullResponseRef.remove();

    // Converte i risultati in oggetti Richiesta
    const indexRequests = requestsJson.map(rq => Richiesta.from(rq));

    const interventionSearchSection = document.getElementById("interventionSearch");
    indexRequests.forEach(request => {
      const singleRequest = createSingleRequest(request);
      interventionSearchSection.insertAdjacentHTML('beforeend', singleRequest);
    });
  } else {
    // Se la risposta ha uno stato di errore, solleva l'eccezione con il messaggio di errore
    throw requestsJson;
  }
}


showUserRequests = async() => {
  // Ottiene le richieste dell'utente utilizzando l'API
  const requests = await Api.getRequests();
  
  // Ottiene la sezione in cui mostrare le richieste dell'utente
  const requestsSection = document.getElementById("userDisplayrequest");

  // Itera su ciascuna richiesta e crea l'HTML per mostrare la singola richiesta
  for (let request of requests) {
    const singleRequest = createSingleRequest(request);
    requestsSection.insertAdjacentHTML('beforeend', singleRequest);
  }
}


}

export default App;