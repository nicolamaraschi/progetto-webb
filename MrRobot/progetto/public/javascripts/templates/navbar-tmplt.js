'use strict';

// NAVBAR UTENTE CHE HA FATTO ACCESSO
function createUserNavbar(){
    return `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark" id="navbarTop">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">
      <img src="logo.png" alt="mrRobot Logo"  class="d-inline-block align-text-top">
      <b></b>
    </a>
    <div class="navbar-nav ms-auto">
      <a class="nav-link" href="/logout">Logout</a>
    </div>
  </div>
</nav>

`
}

// NAVBAR UTENTE CHE NON HA FATTO ACCESSO
function createIndexnavbar(){
    return `
    
    <style>
	
	</style>
    
 
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark" id="navbar">
    <div class="container">
        <div class="navbar-nav">

        <a class="navbar-brand" href="#">
				<img src="logo.png" alt="Logo" >
			</a>
  

      <div class="collapse navbar-collapse" id="navbarContent">
      
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link"  id="userLoginLink" href="/userLogin">Accedi come Utente</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="adminLoginLink" href="/adminLogin">Accedi come Admin</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="registerLink" href="/register">Registrati</a>
        </li>
      </ul>
    </div>
    </div>
</nav>`
}






export {createUserNavbar, createIndexnavbar,};