const express = require('express');
const { checkParams, checkBody } = require('./validation/validator.js');
const { userIdScheme, userScheme } = require('./validation/scheme.js');
const fs = require('fs');
const path = require('path');

const app = express();

const pathJson = path.join(__dirname, '/users.json');

app.use(express.json());

const usersJson = fs.readFileSync(pathJson, 'utf8');

let users = [];

if (usersJson.length > 0) {
    users = JSON.parse(usersJson).users;;
}

/**
 * Выбор всех пользователей
 */
app.get('/users', (req, res) => {
    res.send({ users });
});

/**
 * Выбор конкретного пользователя
 */
app.get('/users/:id', checkParams(userIdScheme), (req, res) => {
    const user = users.find((user) => user.id === Number(req.params.id));

    if (user) {
        res.send({ user });
    } else {
        res.status(404).send({ user: null });
    }
});

/**
 * Добавление нового пользователя
 */
app.post('/users', checkBody(userScheme), (req, res) => {
    let uniqueId = users.length;
    uniqueId += 1;

    users.push({
        id: uniqueId,
        ...req.body
    });

    res.send({
        id: uniqueId
    });
    fs.writeFileSync(pathJson, JSON.stringify({ users }, null, 2));
});

/**
 * Изменение данных пользователя
*/
app.put('/users/:id', checkParams(userIdScheme), checkBody(userScheme), (req, res) => {
    const user = users.find((user) => user.id === Number(req.params.id));

    if (user) {
        user.name = req.body.name;
        user.age = Number(req.body.age);
        user.phone = req.body.phone;
        user.email = req.body.email;
        res.send({ user });
    } else {
        res.status(404).send({ user: null });
    }
    fs.writeFileSync(pathJson, JSON.stringify({ users }, null, 2));
});

/**
 *  Удаление пользователя 
 */
app.delete('/users/:id', checkParams(userIdScheme), (req, res) => {
    const user = users.find((user) => user.id === Number(req.params.id));

    if (user) {
        const userIndex = users.indexOf(user);
        users.splice(userIndex, 1);
        res.send({ user });
    } else {
        res.status(404).send({ user: null });
    }

    fs.writeFileSync(pathJson, JSON.stringify({ users }, null, 2));
});

/**
 * Обработка несуществующих страниц 
 */
app.use((req, res) => {
    res.status(404).send({ massage: 'URL not found' });
});


app.listen(3000);