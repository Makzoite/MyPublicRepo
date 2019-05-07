const User = require('../../models/User');
const UserSession = require('../../models/UserSession');
module.exports = (app) => {
  /*
  /Sign Up
  */
  app.post('/api/account/signup', (req,res,next) => {
    const {body} = req;
    const {
      firstName,
      lastName,
      password
    } = body;
    let{
      email
    }= body;
    if(!firstName){
      return res.send({
        success: false,
        message: 'Error: First name cannot be blank.'
      });
    }
    if(!lastName){
      return res.send({
        success: false,
        message: 'Error: Last name cannot be blank.'
      });
    }
    if(!email){
      res.end({
        success: false,
        message: 'Error: Email cannot be blank.'
      });
    }
    if(!password){
      return res.send({
        success: false,
        message: 'Error: password cannot be blank.'
      });
    }
    email = email.toLowerCase();

    User.find({
      email:email
    },(err,previousUsers)=>{
      if(err){
        return res.send({
          success: false,
          message: 'Error: Something Happened Wrong.'
        });
      }
      else if(previousUsers.length > 0){
        return res.send({
          success: false,
          message: 'Error: User already exists.'
        });
      }

      const newUser = new User();
      newUser.email = email;
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.password = newUser.generateHash(password);
      newUser.save((err,user)=>{
        if(err){
          return res.send({
            success: false,
            message: 'Error: Cannot save user, Something went wrong.'
          });
        }
        return res.send({
          success: true,
          message: 'User signed up.'
        });
      });
    });
  });
  app.post('/api/account/signin',(req,res,next)=>{
    const {body} = req;
    const {
      password
    } = body;
    let {
      email
    } = body;

    if(!email){
      res.send({
        success: false,
        message: 'Error: Email cannot be blank.'
      });
    }
    if(!password){
      return res.send({
        success: false,
        message: 'Error: password cannot be blank.'
      });
    }

    email = email.toLowerCase();
    User.find({
      email:email
    },(err,users)=>{
      if(err){
        return res.send({
          success: false,
          message: 'Error: Something Happened Wrong.'
        });
      }
      if(users.length != 1){
        return res.send({
          success: false,
          message: 'Error: User doesn\'t exists.'
        });
      }
      const user = users[0];
      if(!user.validPassword(password)){
        return res.send({
          success: false,
          message: 'Error: Email or password wrong.'
        });
      }
      const userSession = new UserSession();
      userSession.userId = user._id;
      userSession.save((err,doc)=>{
        if(err){
          return res.send({
            success: false,
            message: 'Error: Something Happened Wrong.'
          });
        }
        return res.send({
          success: true,
          message: 'Sign in success',
          token: doc._id,
          userfirstname: user.firstName
        });
      });
    });
  });
  app.get('/api/account/verify',(req,res,next)=>{
    const {query} = req;
    const {token} = query;
    UserSession.find({
      _id: token,
      isDeleted: false
    }, (err,sessions)=>{
      if(err){
        console.log(err);
        return res.send({
          success: false,
          message: 'Error: Something Happened Wrong.'
        });
      }
      console.log(sessions);
      if(sessions.length != 1){
          return res.send({
            success: false,
            message: 'Error: Invalid session'
          });
      }
      else {
        return res.send({
          success: true,
          message: 'Success: Verified and good.'
        });
      }
    });
  });
  app.get('/api/account/logout',(req,res,next)=>{
    const {query} = req;
    const {token} = query;
    console.log(token);
    UserSession.findOneAndUpdate({
      _id: token,
      isDeletedS: false
    },{
      $set:{isDeleted:true}
    }, null, (err,sessions)=>{
      console.log(sessions);
      if(err){
        console.log(err);
        return res.send({
          success: false,
          message: 'Error: Something Happened Wrong.'
        });
      }
      return res.send({
        success: true,
        message: 'Success: Logged Out.'
      });
    });
  });
};
