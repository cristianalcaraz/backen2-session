import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import ViewRouter from './routes/views.route.js';
import SessionsRouter from './routes/sessions.route.js';
import { create } from 'express-handlebars';
import { __dirname } from './utils.js';
import mongoose from 'mongoose';
import passport from 'passport';
import initPassport from './config/passport.config.js';
import cors from 'cors'

const hbs = create();
const app = express();
app.use(
    cors({ origin: ['http://localhost:8080', 'http://127.0.0.1:8080'] })
)

app.use(session({
    store: MongoStore.create({
        mongoUrl:'mongodb+srv://cristianalcaraz:9TBmVJbPBy3QIEJW@coderback.ptzqqzi.mongodb.net/?retryWrites=true&w=majority&appName=coderBack',
        dbName: 'users',
        ttl: 3600
    }),
    secret: 'C0D3RH0US3',
    resave: true,
    saveUninitialized: false,
}));

initPassport();
app.use(passport.initialize());
app.use(passport.session());

app.engine('handlebars', hbs.engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', ViewRouter);
app.use('/api/sessions/', SessionsRouter);

app.listen(8080, () => {
    console.log('Servidor en 8080')
})


mongoose.connect('mongodb+srv://cristianalcaraz:9TBmVJbPBy3QIEJW@coderback.ptzqqzi.mongodb.net/?retryWrites=true&w=majority&appName=coderBack', { dbName: 'users' })
    .then(() => { console.log('BBDD connectada!') })
    .catch(() => {
        console.log('Error al conectarse a la bbdd')
    })
