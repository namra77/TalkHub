
const isLogin = async(req,res,next)=>{
  try {
    if(req.session.user){
    }else{
      res.redirect('login');
      return
    }
    next();
  } catch (error) {
    console.log(error.message);   
  }
}


const isLogout = async(req,res,next)=>{
  try {
    if(req.session.user){
      res.redirect('/dashboard');
      return
    }
    next();
  } catch (error) {
    console.log(error.message);   
  }
}

module.exports = {
  isLogin,
  isLogout
}