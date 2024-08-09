const express = require('express');
const app = express();
const port = process.env.port || 8080;
const cors = require('cors');

const bcrypt = require("bcryptjs");
const saltRounds = 10;

const knex = require('knex')(require('../knexfile.js')[process.env.NODE_ENV || "development"]);

app.use(express.json());
app.use(cors())

//USERS
//gets all users
app.get('/users', async (req, res) => {
    const allUsers = await knex("users")
    res.status(200).json(allUsers)
})
//get user id by username
app.get('/users/:username', async (req, res) => {
    const { username } = req.params;
    const user = await knex("users").where("username", username);
    res.status(200).json(user[0].id)
})
//get username by id
app.get('/usersById/:id', async (req, res) => {
    const { id } = req.params;
    const user = await knex("users").where("id", id);
    res.status(200).json(user[0].username)
})
//login to account hashed
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    let query = await knex('users').select("*").where("username", username);
    
    if(query.length == 1) {
        await bcrypt.compare(password, query[0].password, function(err, result) {
            if(result) {
                res.status(200).json("Success!");
            }
            else {
                res.status(401).json("Incorrect password");
            }
        })
    }
    else {
        res.status(401).json("Incorrect username");
    }
})
//create account hashed
app.post("/create", async (req, res) => {
    const { first, last, username, password } = req.body;
    let query = await knex('users').select("*").where("username", username);

    if(query.length == 0) {
        
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        
        await knex("users").insert({first: first, last: last, username: username, password: hash})
        res.status(201).json("Account created!");
    }
    else {
        res.status(403).json("Account with that username already exists");
    }
})

//delete account
app.delete("/deleteuser/:id", async (req, res) => {
    const { id } = req.params;
    await knex('users').where("id", id).del();
    res.status(200).json("Item deleted.")
})

//ITEMS
//gets all items
app.get('/items', async (req, res) => {
    const allItems = await knex("items")
    res.status(200).json(allItems)
})
//gets item by item id
app.get('/items/:id', async (req, res) => {
    const { id } = req.params;
    const queried = await knex("items").where("id", id);
    res.status(200).json(queried)
})
//gets item by user
app.get('/itemsByUser/:username', async (req, res) => {
    const { username } = req.params;
    const user = await knex("users").where("username", username);
    const queried = await knex("items").where("user_id", user[0].id);
    res.status(200).json(queried)
})
//create new item
app.post("/items", async (req, res) => {
    const { name, description, quantity, username } = req.body;
    const user = await knex("users").where("username", username);
    const user_id = user[0].id;
    await knex("items").insert({name: name, description: description, quantity: quantity, user_id: user_id});
    res.status(201).json("Item created!");
})
//deletes an item by id
app.delete("/items/:id", async (req, res) => {
    const { id } = req.params;
    await knex('items').where("id", id).del();
    res.status(200).json("Item deleted.")
})
//updates item by id
app.patch("/items/:id", async (req, res) => {
    const { id } = req.params;
    for(property in req.body) {
        await knex('items').where("id", id).update(property, req.body[property])
    }
    res.status(200).json("Item modified.")
})

app.listen(port, () => console.log(`Express server listening on port ${port}`));

// //create account
// app.post("/create", async (req, res) => {
//     const { first, last, username, password } = req.body;
//     let query = await knex('users').select("*").where("username", username);

//     if(query.length == 0) {
//         await knex("users").insert({first: first, last: last, username: username, password: password})
//         res.status(201).json("Account created!");
//     }
//     else {
//         res.status(403).json("Account with that username already exists");
//     }
// })

// //login to account
// app.post("/login", async (req, res) => {
//     const { username, password } = req.body;
//     let query = await knex('users').select("*").where("username", username);

//     if(query.length == 1 && password == query[0].password) {
//         res.status(200).json("Success!");
//     }
//     else {
//         res.status(401).json("Incorrect username or password");
//     }
// })