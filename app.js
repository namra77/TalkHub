
const dotenv = require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.URI)
.then(()=>console.log("Connected to Mongodb sucessfully"))
.catch((err)=>console.log("Error connected to Mongodb",err));


const app = require('express')();

const http = require('http').Server(app);

const path = require("path");

const videoController = require('./controllers/videoController');
const homeController = require('./controllers/homeController');
const aboutController = require('./controllers/aboutController');
const servicesController = require('./controllers/servicesControlller');
const contactController = require('./controllers/contactController');


const userRoutes = require('./routes/userRoutes');
const User = require('./model/userModel');
const Chat = require('./model/chatModel');


app.use('/', userRoutes);


const io = require('socket.io')(http);

var usp = io.of('/user-namespace')

usp.on('connection', async function(socket){
  console.log("User Connected");

  var userId = socket.handshake.auth.token;

  await User.findByIdAndUpdate({_id: userId}, {$set:{is_online:'1'}});
  
  //user broadcast online status
  socket.broadcast.emit('getOnlineUser', {user_id:userId});

  socket.on('disconnect', async function(){
    console.log("User Disconnected");
    
    var userId = socket.handshake.auth.token;

    await User.findByIdAndUpdate({_id: userId}, {$set:{is_online:'0'}});

    //user broadcast offline status
  socket.broadcast.emit('getOfflineUser', {user_id:userId});

  });

  //chatting implementation

  socket.on('newChat', function(data){
    socket.broadcast.emit('loadNewChat',data);
  })

  //load old chats
  socket.on('existsChat', async function(data){
    var chats = await Chat.find({$or:[
      {sender_id: data.sender_id, receiver_id: data.receiver_id},
      {sender_id: data.receiver_id, receiver_id: data.sender_id},
    ]});

    socket.emit('loadChats', {chats : chats});
  });

  //delete chats
  socket.on('chatDeleted', function(id){
    socket.broadcast.emit('chatMessageDeleted',id);
  });

   //update chats
   socket.on('chatUpdated', function(data){
    socket.broadcast.emit('chatMessageUpdated',data);
  });

  //New Group Chat 
  socket.on('newGroupChat', function(data){
    socket.broadcast.emit('loadNewGroupChat', data) //broadcasting new group chat
  });


socket.on('groupChatDeleted', function(id){

  socket.broadcast.emit('groupChatMessageDeleted', id)
})



  //update group  chats
  socket.on('groupChatUpdated', function(data){
    socket.broadcast.emit('groupChatMessageUpdated',data);
  });
});

app.set("view engine","ejs");

// Route to render the video call page
userRoutes.get('/video', (req, res) => {
    res.redirect('/video');
});

userRoutes.get('/home', (req, res) => {
    res.redirect('/home');
});
userRoutes.get('/about', (req, res) => {
    res.redirect('/about');
});
userRoutes.get('/services', (req, res) => {
    res.redirect('/services');
});
userRoutes.get('/contact', (req, res) => {
    res.redirect('/contact');
});



const PORT = process.env.PORT || 3000;

http.listen(PORT, function(){
  console.log(`Server is running on localhost http://localhost:${PORT}`);
})


