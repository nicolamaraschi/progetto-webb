'use strict'

const { response } = require('express');
const bcrypt = require('bcrypt');
const sqlite = require('sqlite3');

const db = new sqlite.Database('project.db', (err) => {

  if (err) throw err;
  else console.log("Connected to DB");

});


exports.getRequests = function () {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM richieste";
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      const courses = rows.map((e) => (
        {
          categoria: e.categoria,
          nome: e.nome,
          descrizione: e.descrizione,
          stato: e.stato
        }
      ));

      resolve(courses.reverse());
    });
  });
}

// ricieste solo soddisfatto
exports.getIndexRequests = function () {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM richieste WHERE stato = 'Soddisfatta'";
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      const courses = rows.map((e) => (
        {
          categoria: e.categoria,
          nome: e.nome,
          descrizione: e.descrizione,
          stato: e.stato
        }
      ));

      resolve(courses.reverse());
    });
  });
}


exports.getAdminRequests = function () {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM richieste";
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      const courses = rows.map((e) => (
        {
          categoria: e.categoria,
          nome: e.nome,
          descrizione: e.descrizione,
          stato: e.stato
        }
      ));

      resolve(courses.reverse());
    });
  });
}



exports.getIndexSearchRequest = function (elements) {
  return new Promise((resolve, reject) => {
    let sql = "SELECT categoria, nome, descrizione, stato FROM richieste WHERE 1=1";
    const params = [];

    if (elements.categoria) {
      sql += " AND categoria LIKE ?";
      params.push(`%${elements.categoria}%`);
    }

    if (elements.nome) {
      sql += " AND nome LIKE ?";
      params.push(`%${elements.nome}%`);
    }

    db.all(sql, params, (err, rows) => {
      // Se c'è un errore, la promessa viene rigettata 
      if (err) {
        reject(err);
        return;
      }

      // Se la query ha successo, mappa i risultati in un array di oggetti 
      const selectedItems = rows.map((e) => ({
        categoria: e.categoria,
        nome: e.nome,
        descrizione: e.descrizione,
        stato: e.stato,
      }));

      // Risolve la promessa con l'array di oggetti 
      resolve(selectedItems);
    });
  });
};



// funzione di inserito del prodotto 
exports.userPostRequest = function (bodyParams) {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO richieste (categoria, nome, descrizione, stato) VALUES (?, ?, ?, ?);";
    db.run(sql, [bodyParams.categoria, bodyParams.nome, bodyParams.descrizione, bodyParams.stato], (err) => {
      if (err) {

        reject(err);
        return;
      }
      resolve();
    });
  })
}


exports.updateRequest = function (bodyParams) {
  return new Promise((resolve, reject) => {
    //sql da gestire tramite query parametrica
    const sql = "UPDATE richieste SET stato='" + bodyParams.stato + "' WHERE categoria='" + bodyParams.categoria + "' AND nome='" + bodyParams.nome + "';";
    db.run(sql, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  })
}


exports.getAdmin = function (nome, adminId) {
  return new Promise((resolve, reject) => {
    //sql da gestire tramite query parametrica
    const sql = "SELECT * FROM admin WHERE (nome = ? AND id =?);";
    db.get(sql, [nome, adminId], (err, row) => {
      if (err) {
        reject(err);
      }
      else if (row == undefined) {
        resolve({ error: 'User not found' });
      }
      else {
        const admin = { nome: row.nome };
        let check = false;
        check = true;
        resolve({ admin, check })
      }
    });
  })
}

exports.getUser = function (username, password) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM utenti WHERE email = ?;";
    db.get(sql, [username], (err, row) => {
      if (err) {
        reject(err);
      } else if (row == undefined) {
        resolve({ error: 'User not found' });
      } else {
        bcrypt.compare(password, row.password, (err, result) => {
          if (err) {
            reject(err);
            return;
          }

          const admin = { nome: row.nome };
          const check = result;
          resolve({ admin, check });
        });
      }
    });
  });
}


exports.getAdminById = function (adminId) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM admin WHERE id = ?';
    db.get(sql, [adminId], (err, row) => {
      if (err)
        reject(err);
      else if (row === undefined)
        resolve({ error: 'User not found.' });
      else {
        const user = { id: row.id, nome: row.nome };
        resolve(user);
      }
    });
  });
};

exports.newuser = function (userParams) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO utenti (nome, cognome, email, password) VALUES (?, ?, ?, ?);';

    bcrypt.hash(userParams.psw, 10, (err, hash) => {
      if (err) {
        reject(err);
        return;
      }

      db.run(sql, [userParams.nome, userParams.cognome, userParams.email, hash], (err, row) => {
        if (err) {
          reject(err);
          return;
        }

        resolve();
      });
    });
  });
}
