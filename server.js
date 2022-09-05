const express = require("express");
const port = process.env.PORT || 8000;
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();
const users = require("./db/users.json");
const models = require("./models");

// console.log(users);

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("Login");
});

app.get("/dashboard", async (req, res) => {
  const users = await models.UserGame.findAll();
  res.render("dashboard", { users: users });
});

app.get("/create", (req, res) => {
  res.render("create");
});

app.post("/save", async (req, res) => {
  const { username, passsword } = req.body;
  try {
    await models.UserGame.create({ username: username, passsword: passsword });
    res.redirect("/dashboard");
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.get("/addbiodata/:id", async (req, res) => {
  const { id } = req.params;
  const user = await models.UserGame.findOne({
    where: { id: id },
  });
  res.render("addbiodata", { user });
});

app.post("/addbiodata/:id", async (req, res) => {
  const { id } = req.params;
  const { UserGameId, DOB, POB, city, gender } = req.body;
  await models.UserBiodata.create({
    UserGameId: UserGameId,
    DOB: DOB,
    POB: POB,
    city: city,
    gender: gender,
  });
  res.redirect("/dashboard");
});

app.get("/edit/:id", async (req, res) => {
  const { id} = req.params;
  const user = await models.UserGame.findOne({
    where: { id: id },
  });
  const biodata = await models.UserBiodata.findOne({
    where: { UserGameId: id },
  });
  res.render("edit", { user, biodata });
});

app.post("/save-edit/:id", async (req, res) => {
  const {id} = req.params;
  const user = await models.UserGame.findOne({
    where: { id: id },
  });
  const biodata = await models.UserBiodata.findOne({
    where: { UserGameId: id },
  });
  await user.update(req.body);
  await biodata.update(req.body);
  res.redirect("/dashboard");
});

app.get("/details", (req, res) => {
  res.render("details");
});

app.get('/delete/:id', async (req, res) => {
  const { id } = req.params;
  await models.UserGame.destroy({
    where: {
      id: id
    }
  });

  res.redirect('/dashboard');
});

app.post("/Login", (req, res) => {
  const { username, password } = req.body;
  if (username == users[0].username && password == users[0].password) {
    res.redirect("/main-menu");
  } else {
    res.end("Invalid Username or Password");
  }
});

app.get("/main-menu", (req, res) => {
  res.render("index");
});
app.get("/game", (req, res) => {
  res.render("game");
});

app.get("/API", (req, res) => {
  res.status(200).send({ username: users[0].username, password: "******" });
});
app.listen(port);
