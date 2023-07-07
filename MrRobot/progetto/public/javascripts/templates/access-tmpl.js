'use strict';

function createUserLogin(){
    return `<style>
    
</style>

<div class="containerLogin">
    <h1>Pagina di Login Utente</h1>
    <form id="loginForm" class="formLogin">
        <label for="emailForm" class="labelLogin">Inserisci la tua email:</label>
        <input id="emailForm" type="email" placeholder="Email" required="" class="inputLogin">

        <label for="passwordForm" class="labelLogin">Inserisci la tua password:</label>
        <div id="sectionId">
            <input id="passwordForm" type="password" placeholder="Password" required="" class="inputLogin">
        </div>

        <div>
            <button id="userLoginButton" type="submit" class="buttonLogin">Login</button>
            <a class="notRegistered" href="/register">Non sei registrato?</a>
        </div>
    </form>
</div>



        `
}

function createAdminLogin(){
    return `
    <style>
	
</style>

<div class="containerAdminLogin">
	<h1>Pagina di Login Admin</h1>
	<form id="adminLogin" class="formAdminLogin">
		<label for="form-select" class="labelAdminLogin">Nome</label>
		<input type="text" id="inputCategoria" placeholder="Nome o nickname dell'admin" required="" class="inputAdminLogin">

		<div id="sectionId" style="display: flex; flex-direction: column; align-items: center;">
			<label for="exampleInputPassword1" class="labelAdminLogin">Id</label>
			<input id="adminId" type="password" placeholder="Id dell'admin" class="inputAdminLogin">
		</div>

		<button id="adminLoginButton" type="submit" class="buttonAdminLogin">Login</button>
	</form>
</div>


   `
}

function createUserRegister(){
    return `
	<style>
	
</style>

<div id="registerDiv">
	<div class="containerRegister">
		<h1>Pagina di Registrazione Utente</h1>
		<form class="formRegister">
			<label for="registerName" class="labelRegister">Nome</label>
			<input id="inputName" type="text" required="" class="inputRegister">
			<label for="registerSurname" class="labelRegister">Cognome</label>
			<input id="inputSurname" type="text" required="" class="inputRegister">

			<label for="exampleInputEmail1" class="labelRegister">Indirizzo Email</label>
			<input id="inputEmail" type="email" aria-describedby="emailHelp" required="" class="inputRegister">
			<div id="emailHelp"></div>

			<label for="exampleInputPassword1" class="labelRegister">Password</label>
			<input id="password" type="password" required="" class="inputRegister">

			<label for="exampleInputPassword1" class="labelRegister">Conferma password</label>
			<input id="confermaPassword" type="password" required="" class="inputRegister">

			<button id="userRegister" type="submit" class="buttonRegister">Register</button>
		</form>
	</div>
</div>



`
}

export {createUserLogin, createAdminLogin, createUserRegister};