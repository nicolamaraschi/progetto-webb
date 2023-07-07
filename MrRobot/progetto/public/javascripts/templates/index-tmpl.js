'use strict';

function createIndexSections(){
    return `
    <div id="interventionSearch">
        <div class="sectionsTitle shadow-lg p-3 mb-5 bg-body rounded"><b><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
      </svg> 
      Ricerca Prodotti: 
      </b>
      </div>

        
      <div id="indexForm" style="display: flex; justify-content: space-between; margin-bottom: 40px;">
      <form method="GET" style="display: flex; width: 100%;">
        <div style="flex-basis: 33.33%;">
          <input class="form-control" type="text" id="inputCategoria" placeholder="Inserisci Categoria Prodotto" required>
        </div>
        <div style="flex-basis: 33.33%;">
          <input class="form-control" type="text" id="inputNome" placeholder="Inserisci Nome Prodotto" required>
        </div>
        <div style="flex-basis: 33.33%; display: flex; justify-content: center;">
          <button class="btn btn-success" id="generalUserSearch" type="submit" style="width: 100%;">Ricerca Prodotto</button>
        </div>
      </form>
    </div>
    



    </div>

    <div class="lavoriRecenti" id="recentWorks">
        <div class="sectionsTitle shadow-lg p-3 mb-5 bg-body rounded">
        <b>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16">
        <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
        <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
      </svg> 
      Prodotti attualmente Aggiunti con Successo:
      </b>
      </div>
        <div class="innerLavoriRecenti" id="displayRecentWorks"></div>
    </div>


    
    


    
     `
}

export {createIndexSections};