import passport from 'passport';
import passportJWT from 'passport-jwt';
import { devConfig } from '../../config/env/development';
import User from './../resources/user/user.model';

export const configureJWTStrategy = () => {

    let opts = {}
    opts.jwtFromRequest = passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = devConfig.secret;
    passport.use(
        new passportJWT.Strategy(opts, function(payload, done) {
            User.findOne({ _id: payload._id }, function(err, user) {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                    // or you could create a new account
                }
            });
        }));
}