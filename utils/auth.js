import jwt from 'jsonwebtoken';
import passport from '../utils/pass';

const login = (req) => {
    return new Promise((resolve, reject) => {
        passport.authenticate('local', {session: false},
        (err, user, info) => {
            if(err || !user){
                reject(info.message);
            }
            req.login(user, {session: false}, (err) => {
                if(err || !user){
                    reject(info.message);
                }
                const token = jwt.sign(req.user, process.env.SECRET_KEY);
                resolve( {...user, token, id: user._id});
            });
            
        })(req);
    });
    
};


const checkAuth= (req) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('local', {session: false},
    (err, user, info) => {
      console.log(user);
      resolve(user);
    })(req);
});
}


const check = (req) => {
    return new Promise((resolve) => {
      passport.authenticate('jwt', {session: false},(err, user, info) => {
        const token = req.headers.authorization || '';
        if(token !== ''){
        }
          
        
        //const payload = jwt.verify(token,process.env.SECRET_KEY);
        if (err || !user) {
          resolve({message: 'error'});
        }
        resolve(user);
      })(req);
    });
  };
  

export {checkAuth, check, login};


