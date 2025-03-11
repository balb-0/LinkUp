import express from "express";
import EnvManager from "./classes/EnvManager";

const app = express();
const port  = EnvManager.getEnvOrThrow("PORT");

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

