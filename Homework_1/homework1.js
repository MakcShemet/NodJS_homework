// Напишите HTTP сервер и реализуйте два обработчика, где:
// — По URL “/” будет возвращаться страница, на которой есть гиперссылка на вторую страницу по ссылке “/about”
// — А по URL “/about” будет возвращаться страница, на которой есть гиперссылка на первую страницу “/”
// — Также реализуйте обработку несуществующих роутов (404).
// — * На каждой странице реализуйте счетчик просмотров. Значение счетчика должно увеличиваться на единицу каждый раз, 
// когда загружается страница.

const http = require('http');
let counterHome = 0;
let counterAbout = 0;

const server = http.createServer((req, res) => {
    console.log('Запрос получен');

    let h1El;

    if (req.url === '/') {
        h1El = '<h1>Корневая страница</h1>';
    } else if (req.url === '/about') {
        h1El = '<h1>О компании</h1>';
    } else {
        h1El = '<h1>Ошибка 404. Страница не найдена!</h1>';
    }

    if (req.url === '/') {
        res.writeHead(200, {
            'Content-type': 'text/html; charset=UTF-8',
        });
        res.write(`${h1El}<p>Количество просмотров: ${++counterHome}</p>`);
        res.end(`<a href="/about">О компании</a>`);
    } else if (req.url === '/about') {
        res.writeHead(200, {
            'Content-type': 'text/html; charset=UTF-8',
        });
        res.write(`${h1El}<p>Количество просмотров: ${++counterAbout}</p>`);
        res.end(`<a href="/">Главная</a>`);
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html; charset=UTF-8',
        });
        res.end(`${h1El}<br><a href="/">Вернуться на главную</a>`);
    }
});

const port = 3000;

server.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});