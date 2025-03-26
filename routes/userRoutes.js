const express = require("express");
const path = require("path");
const multer = require("multer");
const bodyParser = require("body-parser");
const session = require('express-session');
const cookieParser = require('cookie-parser');

const user_route = express();

// Import your controller
const videoController = require('../controllers/videoController');
const homeController = require('../controllers/homeController');
const aboutController = require('../controllers/aboutController');
const servicesController= require('../controllers/servicesControlller');
const contactController = require('../controllers/contactController');


//Controllers and Middlewares
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

//Environment variables
const { SESSION_SECRET } = process.env;

//Session middleware
user_route.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

//Cookie middleware
user_route.use(cookieParser());

//Body-parser middleware
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({ extended: true }));

//Set view engine
user_route.set("view engine", "ejs");
user_route.set("views", path.join(__dirname, "../views"));

//Serve static file
user_route.use(express.static("public"));

//Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

const upload = multer({ storage: storage });

//? --------------------------------------------Routes--------------------------------------------------
//Register route
user_route.get('/register', auth.isLogout, userController.registerLoad);
user_route.post('/register', upload.single('image'), userController.register);

//Login/Logout routes
user_route.get('/', auth.isLogout, userController.loadLogin);
user_route.post('/', userController.login);
user_route.get('/logout', auth.isLogin, userController.logout);

//Dasjboard route
user_route.get('/dashboard', auth.isLogin, userController.loadDashboard);
user_route.post('/save-chat', userController.saveChat);

user_route.post('/delete-chat', userController.deleteChat);
user_route.post('/update-chat', userController.updateChat);

user_route.get('/groups', auth.isLogin, userController.loadGroups)
user_route.post('/groups', upload.single('image'), userController.createGroup)

user_route.post('/get-members', auth.isLogin, userController.getMembers);

user_route.post('/add-members', auth.isLogin, userController.addMembers);


user_route.post('/update-chat-group', auth.isLogin, upload.single('images'), userController.updateChatGroup);

user_route.post('/delete-chat-group', auth.isLogin, userController.deleteChatGroup);

user_route.get('/share-group/:id', userController.shareGroup),
  user_route.post('/join-group', userController.joinGroup)
user_route.get('/group-chat', auth.isLogin, userController.groupChats)
user_route.post('/group-chat-save', userController.saveGroupChat)
user_route.post('/load-group-chats', userController.loadGroupChats)

user_route.post('/delete-group-chat', userController.deleteGroupChat)
user_route.post('/update-group-chat', userController.updateGroupChat)

// Define the route
user_route.get('/video', videoController.getVideoPage);
user_route.get('/home', homeController.getHomePage);
user_route.get('/about', aboutController.getAboutPage);
user_route.get('/services', servicesController.getServicesPage);
user_route.get('/contact', contactController.getContactPage);

//Catch all route rediretcted to home page
user_route.get('*', function (req, res) {
  res.redirect('/');
});

//Export the route
module.exports = user_route;