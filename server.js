const express = require("express");
const app = express();
app.use(express.json());

let users = [
{ id: 1, name: "asep", email: "asepsamsudin@example.com"},
{ id: 2, name: "joe", email: "joe@example.com"},
{ id: 3, name: "daniel", email: "daniel@example.com"}
];

//endpoint get ngambil data
app.get("/api/users", (req, res) => {
    res.json(users);
});

app.get("/api/users", (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find((u) => u.id === userId);
    if(!user){
        return res.status(404).send("User tidak ada");
    }
    res.json(user);
});

//endpoint post menambahkan data
app.post("/api/users", (req, res) => {
    const {name, email} = req.body;
    const newUser = {
        id: users.length + 1,
        name,
        email
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

//endpoint delete
app.delete("/api/users/:id", (req, res) => {
    const userId = parserInt(req.params.id);
    users = users.filter((u) => u.id !== userId);

    res.sendStatus(204).send("user berhasil dihapus!");
});
//endpoint update
app.put("/api/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const {name, email} = req.body;
    const user = users.find((u) => u.id === userId);
    if (!user){
        return res.status(404).send("user tidak ada");
    }
    user.name = name;
    user.email = email;
    res.json(user);
});

// endpoint ngambil data
app.get("api/users",(req, res) => {
    res.json(users);
});
//jalankan server di port
const PORT = process.env || 3000;
app.listen(PORT, () => {
    console.log(`server berjalan di http://localhost:${PORT}`);
});