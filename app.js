const express = require("express");
const mysql = require("mysql2"); // framework web

const app = express();
const port = 8080;

const bdd = require("./model/pool.js");

app.use(express.urlencoded({ extended: false }));
// permet la récupération des champs post
app.use(express.json());
// permet l'échange de données au format JSON
const cookieParser = require("cookie-parser");
const session = require("express-session");

app.set("views", __dirname + "/view");
app.set("view engine", "ejs");
app.use(session({ secret: "Shh, its a secret!", cookie: { maxAge: 60000 } })); // maxage c'est la durée de ta session

function checkSignIn(req,res,next) {
  if (req.session.user) {
    console.log(req.session.user);
    next()
  } else {
    var err = new Error("Not logged in!");
    console.log(err);
    process.exit();
  }
}

app.get("/accueil", (req, res) => {
  res.render("accueil");
});
app.get("/acteur/:id", (req, res) => {
  bdd.getActeur(req.params.id, function (row) {
    res.render("acteur", { acteur: row });
  });
});
app.get("/acteurs", checkSignIn, (req, res) => {
  bdd.getAllActor(function (row) {
    res.render("acteurs", { acteurs: row });
  });
});
app.get("/realisateur/:id", (req, res) => {
  bdd.getRealisateur(req.params.id, function (row) {
    res.render("realisateur", { realisateur: row });
  });
});
app.get("/realisateurs", (req, res) => {
  bdd.getAllRealisateur(function (row) {
    res.render("realisateurs", { realisateurs: row });
  });
});
app.get("/ajout_acteur", (req, res) => {
  res.render("ajout_acteur");
});
app.post("/send", (req, res) => {
  bdd.AddActor(req.body, function (r) {
    if (r) {
      res.redirect("/acteurs");
    } else {
      res.send("err");
    }
  });
});
app.get("/modifier_acteur/:id", (req, res) => {
  bdd.getActeur(req.params.id, function (row) {
    res.render("modifier_acteur", { acteurs: row });
  });
});
app.post("/modifier_acteur", (req, res) => {
  bdd.ModifActor(req.body, function (r) {
    if (r) {
      res.redirect("/acteurs");
    } else {
      res.send("err");
    }
  });
});
app.get("/delete_acteur/:id", (req, res) => {
  bdd.getActeur(req.params.id, function (row) {
    res.render("delete_acteur", { acteurs: row });
  });
});
app.post("/delete_acteur", (req, res) => {
  bdd.DeleteActor(req.body, function (r) {
    if (r) {
      res.redirect("/acteurs");
    } else {
      res.send("err");
    }
  });
});

app.listen(port, () => {
  console.log("listen to port" + port);
});

const bcrypt = require("bcrypt");
const saltRounds = 10;

app.use(cookieParser());

app.get("/signup", (req, res) => {
  res.render("signup");
});
app.post("/send_add_user", (req, res) => {
  bdd.AddUser(req.body, function (r) {
    if (r) {
      res.redirect("/accueil");
    } else {
      res.send("err");
    }
  });
});

app.post("/connect", (req, res) => {
  bdd.LogIn(req.body, function (r) {
    if (r) {
      req.session.user = r;
      res.redirect("/acteurs");
    } else {
      res.send("err");
    }
  });
});
