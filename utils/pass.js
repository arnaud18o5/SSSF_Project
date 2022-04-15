import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '../models/userModel';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcrypt';
import BearerStrategy from 'passport-http-bearer';


passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'lzenfinze18bjsz',
      issuer: 'accounts.examplesoft.com',
      audience : 'localhost:4000/graphql'
    },
    (jwt_payload, done) => {
      console.log("jwt strategy")
      User.findOne({id:jwt_payload.id}, (err, user) => {
        if(err){
          return done(null, 'error');
        }
        if(user){
          return done(null, user);
        } else {
          return done(null, 'else');
        }
      })
    }
  )
);

passport.use(
    new LocalStrategy(async (username, password, done) => {
      console.log('local strategy');
      // get user by username (in this case email) from userModel/getUserLogin
      const user = await User.findOne({ username });
      // if user is undefined
      if (!user) {
        return done(null, false, 'user not found');
      }
      // if passwords dont match
      if (!(await bcrypt.compare(password, user.password))) {
        return done(null, false, 'password incorrect');
      }
      // if all is ok
      // convert document to object
      const strippedUser = user.toObject();
      delete strippedUser.password;
      console.log(strippedUser);
      return done(null, strippedUser);
    })
  );



  passport.use('bearer',new BearerStrategy(
    (token, done) => {
      User.findOne({ token: token }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user, { scope: 'all' });
      });
    }
  ));
  

export default passport;