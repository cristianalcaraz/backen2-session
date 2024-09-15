import { Router } from "express";
import { isLog } from "../middlewares/protectedRoute.js";

const app = Router();


app.get('/', (req, res) => {
    res.render('home', {
        user: req?.session?.user
    })
})

app.get('/login', isLog,(req, res) => {
    res.render('login', {})
})

export default app;
