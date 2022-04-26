import jwt from 'jsonwebtoken';
import passport from '../utils/pass';

const login = (req) => {
    return new Promise((resolve) => {
        console.log("login");
        passport.authenticate('local', {session: false},
        (err, user, info) => {
            console.log('login auth');
            if(err || !user){
                resolve(false);
            }
            req.login(user, {session: false}, (err) => {
                if(err || !user){
                    resolve(false);
                }
                else{
                    const token = jwt.sign(user, 'lzenfinze18bjsz', {expiresIn: "10h"});
                    console.log(user);
                    resolve( {...user, token, id: user._id});
                }
            });
            
        })(req);
    });
    
};


const checkAuth = (req, res) => {
  return new Promise((resolve) => {
      passport.authenticate('jwt', {session: false},
      (err, user, info) => {
          console.log("user", user);
          if(err || !user){
              resolve({info});
          }
          resolve({user, info});
      })(req, res);
  });
  
};

export {checkAuth, login};


