const connect = require("./mysqlconfig.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.getActeur = function (idacteur, cb) {
  connect.query(
    "SELECT * FROM acteurs WHERE id =" + idacteur,
    function (err, result) {
      cb(...result); // callback est une fonction envoyée en paramètres  à partir de app.js
    }
  );
};
exports.getAllActor = function (cb) {
  connect.query("SELECT * FROM acteurs", function (err, result) {
    cb(result); // callback est une fonction envoyée en paramètres  à partir de app.js
  });
};
exports.getRealisateur = function (idrealisateur, cb) {
  connect.query(
    "SELECT * FROM realisateur WHERE id =" + idrealisateur,
    function (err, result) {
      cb(...result); // callback est une fonction envoyée en paramètres  à partir de app.js
    }
  );
};
exports.getAllRealisateur = function (cb) {
  connect.query("SELECT * FROM realisateur", function (err, result) {
    cb(result); // callback est une fonction envoyée en paramètres  à partir de app.js
  });
};

exports.AddActor = function (POST, cb) {
  connect.query(
    "INSERT INTO acteurs  (nom , prenom, photo) VALUES (?,?,?);",
    [POST.nom, POST.prenom, POST.photo],
    function (err) {
      if (err) cb(false);
      cb(true); // callback est une fonction envoyée en paramètres  à partir de app.js
    }
  );
};
exports.DeleteActor = function (POST, cb) {
  connect.query(
    "DELETE  FROM acteurs  WHERE acteurs.id = ? ;",
    [POST.id],

    function (err) {
      if (err) cb(false);
      cb(true); // callback est une fonction envoyée en paramètres  à partir de app.js
    }
  );
};

exports.ModifActor = function (POST, cb) {
  connect.query(
    "UPDATE acteurs  SET nom = ?, prenom = ?, photo = ? WHERE acteurs.id = ?;",
    [POST.nom, POST.prenom, POST.photo, POST.id],
    function (err) {
      if (err) cb(false);
      cb(true); // callback est une fonction envoyée en paramètres  à partir de app.js
    }
  );
};
exports.AddUser = function (POST, cb) {
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(POST.password, salt, function (err, hash) {
      connect.query(
        "INSERT INTO user  (email , password) VALUES (?,?);",
        [POST.email, hash],
        function (err) {
          if (err) cb(false);
          cb(true); // callback est une fonction envoyée en paramètres  à partir de app.js
        }
      );
    });
  });
};
exports.LogIn = function (POST, cb) {
  connect.query(
    " SELECT * FROM user WHERE email = ?;",
    [POST.email],
    function (err, rows) {
    
      bcrypt.compare(POST.password, rows[0].password, function (err,result) {
        if (err) cb(false)
        else { cb(rows[0]);} 
      });
    }
  );
};
