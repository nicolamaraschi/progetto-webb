'use strict';

//L'UTENTE INSERISCE LE INFORMAZIONI PER IL NUOVO COMPONENTE

function createUserSections(){
    return `
    <div class="requestSubmit" id="requestSubmitSection">
    <div class="sectionsTitle shadow-lg p-3 mb-5 bg-body rounded">
      <b>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-wrench" viewBox="0 0 16 16">
          <path d="M.102 2.223A3.004 3.004 0 0 0 3.78 5.897l6.341 6.252A3.003 3.003 0 0 0 13 16a3 3 0 1 0-.851-5.878L5.897 3.781A3.004 3.004 0 0 0 2.223.1l2.141 2.142L4 4l-1.757.364L.102 2.223zm13.37 9.019.528.026.287.445.445.287.026.529L15 13l-.242.471-.026.529-.445.287-.287.445-.529.026L13 15l-.471-.242-.529-.026-.287-.445-.445-.287-.026-.529L11 13l.242-.471.026-.529.445-.287.287-.445.529-.026L13 11l.471.242z"/>
        </svg>
        Richiesta Aggiunta Prodotto
      </b>
    </div>
  
    <div class="container">
      <form class="innerSubmitRequest" id="formRequest" method="POST">
        <div class="form-group text-center">
          <label for="inputCategoria">Categoria Prodotto</label>
          <input type="text" class="form-control" id="inputCategoria" placeholder="Inserisci Categoria">
        </div>
        <div class="form-group text-center">
          <label for="inputNome">Nome del Prodotto</label>
          <input type="text" class="form-control" id="inputNome" placeholder="Inserisci Nome">
        </div>
        <div class="form-group text-center">
          <label for="inputDescrizione" class="d-block text-center">Descrizione</label>
          <textarea class="form-control" id="inputDescrizione" rows="3" placeholder="Inserisci qui la descrizione" maxlength="70"></textarea>
        </div>
        <div class="text-center">
          <button type="submit" id="userRequestsubmit">Invia</button>
        </div>
      </form>
    </div>
  </div>
  
  <style>
    .container {
      height: auto;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  
    .innerSubmitRequest {
      max-width: 500px;
      width: 100%;
      padding: 20px;
      border: 4px solid #ddd; /* Aggiornato lo spessore del bordo */
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  
    .form-group {
      margin-bottom: 1rem;
    }
  
    label {
      font-weight: bold;
    }
  
    textarea {
      resize: none;
      margin: 0;
      padding: 0; /* Aggiunto padding per il cursore */
    }
  
    .btn {
      margin-top: 1rem;
    }
  
    .custom-div {
      padding: 10px;
      background-color: #f2f2f2;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: 18px;
      font-weight: bold;
      color: #333;
    }
  </style>
  


    <div>
        <div class="sectionsTitle shadow-lg p-3 mb-5 bg-body rounded">
        <b>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-card-list" viewBox="0 0 16 16">
          <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
          <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
        </svg> 
      Lista prodotti che stiamo Processando
      </b>
      </div>
        <div class="userRecentRequest" id="userDisplayrequest">
        </div>
    </div>
    


    <!-- FOOTER -->

    <footer class="footer">
    <div class="containerFooter">
      <div class="rowFooter">
        <div class="col-md-12 text-center">
          <p class="footer-text">Indirizzo: Via Cavour, 23 | Telefono: +39 02 1234567 | Partita IVA: 12345678901</p>
        </div>
      </div>
    </div>
  </footer>
  






</div>`
}

function insertrequestSuccess(){
    return `<div class="userCorrectInsert" id="requestInsert">Richiesta ricevuta, grazie per la tua collaborazione!</div>`;
}

export {createUserSections, insertrequestSuccess};