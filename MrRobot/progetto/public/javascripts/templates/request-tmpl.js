'use strict';

function createSingleRequest(request){


return `<div id="1" class="request shadow-lg p-3 mb-5 bg-body rounded displayRequest">
<div class="d-flex w-100 justify-content-between">
    <div class="form-check">

        <label id="città" class="form-check-label labelRequest"><b>Categoria:</b> 
        ${request.categoria}</label>
        <label class="form-check-label labelRequest"><b>Nome:</b> 
        ${request.nome}</label>
        <label class="form-check-label labelRequest"><b>Descrizione:</b> 
        ${request.descrizione}</label>
        <label class="form-check-label labelRequest
         ${request.stato == 'Pendente' ? 'richiestaPendente' : request.stato == 'Soddisfatta' ? 'richiestaSoddisfatta' : request.stato == 'Rifiutata' ? 'richiestaRifiutata' : ""}"><b>Stato:</b> ${request.stato}</label>

    </div>
</div>
</div>`
}

function createAdminRequest(request){
    return `<div id="1" class="request shadow-lg p-3 mb-5 bg-body rounded displayRequest">
    <div class="d-flex w-100 justify-content-between">
      <div class="form-check">

     
      
        <label id="città" class="form-check-label labelRequest classeCittà">Categoria: 
          ${request.categoria}
        </label>
        <label id="nome" class="form-check-label labelRequest classeVia">Nome:
           ${request.nome}
        </label>
        <label id="descrizione" class="form-check-label labelRequest classeDescrizione">Descrizione:
         ${request.descrizione}
        </label>
        <label class="form-check-label labelRequest richiestaPendente">Stato: 
        ${request.stato}
        </label>

       
        <select class="selectGestioneRichiesta">
          <option>In Osservazione
          </option>
          <option>Rifiuta
          </option>
          <option>Soddisfatta
          </option>
        </select>
        <button class="btn btn-success userBtn" id="generalUserSearch">Submit
        </button>
      </div>
    </div>
  </div>`;
}


function createAdminRequestSoddisfatta(request){
    return `<div id="1" class="request shadow-lg p-3 mb-5 bg-body rounded displayRequest">
    <div class="d-flex w-100 justify-content-between">
      <div class="form-check">

        <label id="città" class="form-check-label labelRequest classeCittà"><b>Categoria:</b>
         ${request.categoria}
        </label>
        <label id="nome" class="form-check-label labelRequest classeVia"><b>Nome:</b>
         ${request.nome}
        </label>
        <label id="descrizione" class="form-check-label labelRequest classeDescrizione"><b>Descrizione:</b> 
        ${request.descrizione}
        </label>
        <label class="form-check-label labelRequest richiestaSoddisfatta"><b>Stato:</b> 
        ${request.stato}
        </label>

      </div>
    </div>
  </div>`;
}

export { createSingleRequest, createAdminRequest, createAdminRequestSoddisfatta};