import jwt from 'jsonwebtoken';
import passport from '../utils/pass';

const login = (req) => {
    return new Promise((resolve, reject) => {
        console.log("login");
        passport.authenticate('local', {session: false},
        (err, user, info) => {
            console.log('login auth');
            if(err || !user){
                reject(info.message);
            }
            req.login(user, {session: false}, (err) => {
                if(err || !user){
                    reject(info.message);
                }
                const token = jwt.sign(req.user, 'lzenfinze18bjsz', {expiresIn: "7d", algorithm: "HS256"});
                resolve( {...user, token, id: user._id});
            });
            
        })(req);
    });
    
};


const checkAuth = (req, res) => {
  return new Promise((resolve) => {
      passport.authenticate('jwt', {session: false},
      (err, user, info) => {
          //console.log("context info", info);
          if(err || !user){
              resolve({info});
          }
          resolve({user, info});
          /*req.login(user, {session: false}, (err) => {
              if(err || !user){
                  resolve(info);
              }
              const token = jwt.sign(req.user, 'lzenfinze18bjsz');
              resolve( {...user, token, id: user._id});
          });*/
          
      })(req, res);
  });
  
};


/*const check = (req) => {
    return new Promise((resolve) => {
      passport.authenticate('jwt', {session: false},(err, user, info) => {
        const token = req.headers.authorization || '';
        if(token !== ''){
        }
          
        
        //const payload = jwt.verify(token,'lzenfinze18bjsz');
        if (err || !user) {
          resolve({message: 'error'});
        }
        resolve(user);
      })(req);
    });
  };
  */

export {checkAuth, login};


