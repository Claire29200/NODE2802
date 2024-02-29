const connect = require("./mysqlconfig.js");

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
    "INSERT INTO acteurs  (nom , prenom, photo) VALUES (?,?,?);", [POST.nom, POST.prenom, POST.photo],
    function (err) {
      if (err) cb(false);
      cb(true); // callback est une fonction envoyée en paramètres  à partir de app.js
    }
  );
};
