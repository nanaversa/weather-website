const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsDirectory = path.join(__dirname, "../templates/views");
const partialsDirectory = path.join(__dirname, "../templates/partials");

const app = express();

app.set("view engine", "hbs");
app.set("views", viewsDirectory);

hbs.registerPartials(partialsDirectory);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Nana Versa",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Nana Versa",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "Please help me",
    name: "Nana Versa",
    title: "Help",
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "No search provided",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404page", {
    title: "404 Page",
    name: "Versa",
    errorMessage: "Help page does not exist",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "No address provided",
    });
  }

  geocode(req.query.address, (error, data) => {
    if (error) {
      return res.send({ error });
    }
    forecast(
      data.latitude,
      data.longitude,
      data.location,
      (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location: data.location,
          address: req.query.address,
        });
      }
    );
  });
});

app.get("*", (req, res) => {
  res.render("404page", {
    name: "Nana Versa",
    title: "404 Page",
    errorMessage: "Cannot Find page",
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
