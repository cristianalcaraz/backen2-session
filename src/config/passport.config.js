import passport from "passport";
import { UserModel } from "../models/user.model.js";
import { Strategy as GithubStrategy } from 'passport-github2';

const initPassport = () => {

    passport.use(new GithubStrategy({
        clientID: 'Iv23liB5IFqGWlPjeHfI',
        clientSecret: '660756806988bfa7c6a6d7288c42fd08e11e97ff',
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback'
    }, async (accToken, refreshToken, profile, done) => {
        console.log(profile)
        try{
            const user = await UserModel.findOne({email: profile?.__json?.username ?? profile.username })
            console.log(profile)
            if(!user){
                const newUser = {
                    nombre: ' ',
                    apellido: ' ',
                    email: profile?.__json?.email ?? profile.username,
                    password: ' ',
                    edad: 20
                }
    
                const userCreate = await UserModel.create(newUser);
                return done(null, userCreate)
            }else {
            
                return done(null, user)
            }
            
        }catch (e){
           return done(e)
        }
    }))
   

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await UserModel.findById(id);
            return done(null, user);
        } catch (error) {
            done(error)
        }
    })
}

export default initPassport;
