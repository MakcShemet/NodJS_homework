const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

const pathJson = path.join(__dirname, '/public/counter.json');
const pathHome = path.join(__dirname, '/public/index.html');
const pathAbout = path.join(__dirname, '/public/about.html');

const counter = JSON.parse(fs.readFileSync(pathJson, 'utf-8'));

const homePage = `<a href="/">Главная</a>
<a href="/about">О компании</a>
<h1>Корневая страница</h1>`;

const aboutPage = `<a href="/">Главная</a>
<a href="/about">О компании</a>
<h1>О компании</h1>`;

app.get('/', (req, res) => {
    res.sendFile(pathHome);
    counter.home += 1;
    fs.writeFileSync(pathJson, JSON.stringify(counter, null, 2));
    res.send(`${homePage}<p>Количество просмотров: ${counter.home}</p>`)
});

app.get('/about', (req, res) => {
    res.sendFile(pathAbout);
    counter.about += 1;
    fs.writeFileSync(pathJson, JSON.stringify(counter, null, 2));
    res.send(`${aboutPage}<p>Количество просмотров: ${counter.about}</p>`);
});

const port = 3000;

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
