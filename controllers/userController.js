const User = require("../model/userModel");
const Chat = require("../model/chatModel");
const Group = require("../model/groupModel");
const Member = require("../model/memberModel");
const GroupChat = require("../model/groupChatModel");
const bcrypt = require("bcrypt");
const express = require("express");
const app = express();
const mongoose = require("mongoose");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Render the register page
const registerLoad = async (req, res) => {
  try {
    res.render("register");
    return;
  } catch (error) {
    console.log(error.message);
  }
};

//Handle user register
const register = async (req, res) => {
  try {
    //Hash the password
    const passwordHash = await bcrypt.hash(req.body.password, 10);

    //Create new user
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      // image: "images/" + req.file.filename,
      image: req.file ? "images/" + req.file.filename : "images/default.png",
      password: passwordHash,
    });

    //Save user to the database
    await user.save();

    //Redirect to register page with a success message
    await res.render("register", {
      message: "Your Registration Has Been Completed!",
    });
  } catch (error) {
    console.log(error.message);
  }
};

//Render the login page
const loadLogin = (req, res) => {
  try {
    const message = req.session.message || "";
    req.session.message = "";
    res.render("login", { message });

  } catch (error) {
    res.render("login", { error });
  }
};

//Handle user login
const login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    const userData = await User.findOne({ email: email });

    if (userData) {
      // Compare passwords
      const passwordMatch = await bcrypt.compare(password, userData.password);
      if (passwordMatch) {
        // Set session and redirect to the dashboard
        req.session.user = userData;
        res.cookie(`user`, JSON.stringify(userData));
        return res.redirect("/dashboard");
      } else {
        // Error: incorrect password
        return res.render("login", { message: "Incorrect password!" });
      }
    } else {
      // Error: no user found
      return res.render("login", { message: "User not found!" });
    }
  } catch (error) {
    console.error(error.message);
    return res.render("login", { message: "An error occurred. Please try again." });
  }
};




//Handle user logout route
const logout = async (req, res) => {
  try {
    res.clearCookie('user');
    req.session.destroy(); //Destroy session
    res.redirect("/"); //Redirect to home page
    return;
  } catch (error) {
    console.log(error.message);
  }
};

//Render user dashboard
const loadDashboard = async (req, res) => {
  try {
    var users = await User.find({ _id: { $nin: [req.session.user._id] } });
    await res.render('dashboard', { user: req.session.user, users: users }); //added here sigle colon instead of double

  } catch (error) {
    console.log(error.message);
  }
};

// save chat
const saveChat = async (req, res) => {
  try {
    var chat = new Chat({
      sender_id: req.body.sender_id,
      receiver_id: req.body.receiver_id,
      message: req.body.message,
    });

    var newChat = await chat.save();

    res
      .status(200)
      .send({ success: true, msg: "Chat Inserted!", data: newChat });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};

const deleteChat = async (req, res) => {
  try {
    await Chat.deleteOne({ _id: req.body.id });

    res.status(200).send({ success: true });

  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};

const updateChat = async (req, res) => {
  try {
    await Chat.findByIdAndUpdate({ _id: req.body.id }, {
      $set: {
        message: req.body.message
      }
    });

    res.status(200).send({ success: true });

  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};

const loadGroups = async (req, res) => {
  try {
    const groups = await Group.find({ creator_id: req.session.user._id, });
    await res.render('group', { groups: groups });

  } catch (error) {
    console.log(error.message);
  }
};

const createGroup = async (req, res) => {
  try {
    const group = new Group({
      creator_id: req.session.user._id,
      name: req.body.name,
      image: 'images/' + req.file.filename,
      limit: req.body.limit
    });

    await group.save();

    const groups = await Group.find({ creator_id: req.session.user._id, });

    await res.render('group', { message: req.body.name + 'Group created successfully!', groups: groups });

  } catch (error) {
    console.log(error.message);
  }
};


//Get Members
const getMembers = async (req, res) => {
  try {

    const userObjectId = new mongoose.Types.ObjectId(req.session.user._id);
    const groupObjectId = new mongoose.Types.ObjectId(req.body.group_id);
    var users = await User.aggregate([
      {
        $lookup: {
          from: "members",
          localField: "_id",
          foreignField: "user_id",
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ["$group_id", groupObjectId] }],
                },
              },
            },
          ],
          as: "member",
        },
      },
      {
        $match: {
          _id: {
            $nin: [userObjectId],
          },
        },
      },
    ]);

    res.status(200).send({ success: true, data: users });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};


// add Members in group
const addMembers = async (req, res) => {
  try {
    if (!req.body.members) {
      res.status(200).send({ success: false, msg: "Please select any one Member" });
    } else if (req.body.members.length > parseInt(req.body.limit)) {
      res.status(200).send({
        success: false, msg: "You cannot select more than " + req.body.limit + " Members",
      });
    } else {

      await Member.deleteMany({ group_id: req.body.group_id });

      var data = [];
      const members = req.body.members;
      for (let i = 0; i < members.length; i++) {
        data.push({
          group_id: req.body.group_id,
          user_id: members[i]

        });

      }

      await Member.insertMany(data);

      return res.status(200).send({ success: true, msg: "Members added successfully" });
    }
  } catch (error) {
    console.error("Error while adding members:", error);
    return res.status(500).send({
      success: false, msg: "An error occurred while adding members", error: error.message,
    });
  }
};

// update chat group
const updateChatGroup = async (req, res) => {
  try {
    if (parseInt(req.body.limit) < parseInt(req.body.last_limit)) {
      await Member.deleteMany({ group_id: req.body.id });
    }

    var updateObj = {
      name: req.body.name,
      limit: req.body.limit
    };

    if (req.file) {
      updateObj.image = 'images/' + req.file.filename;
    }

    await Group.findByIdAndUpdate({ _id: req.body.id }, { $set: updateObj });

    res.status(200).json({ success: true, msg: "Chat group updated successfully" });

  } catch (error) {
    res.status(400).json({ success: false, msg: error.message });
  }
};

// Delete Group
const deleteChatGroup = async (req, res) => {
  try {
    await Group.deleteOne({ _id: req.body.id })
    await Member.deleteMany({ group_id: req.body.id });

    res.status(200).send({ success: true, msg: "chat group Deleted successfully" })
  } catch (error) {
    res.status(500).send({ success: false, msg: error.message });
  }
}

// sharing the group link
const shareGroup = async (req, res) => {
  try {
    var groupData = await Group.findOne({ _id: req.params.id })
    if (!groupData) {
      return res.render('error', { message: '404 not found' })

    }
    else if (req.session.user == undefined) {

      return res.render('error', { message: 'you need to access the share URL' })


    } else {

      var totalMembers = await Member.countDocuments({ group_id: req.params.id });
      var available = groupData.limit - totalMembers;
      var isOwner = groupData.creator_id == req.session.user._id ? true : false;
      var isJoined = await Member.countDocuments({ group_id: req.params.id, user_id: req.session.user._id });
      res.render('shareLink', { group: groupData, available: available, totalMembers: totalMembers, isOwner: isOwner, isJoined: isJoined })

    }
  } catch (error) {
    console.log(error.message)
  }
}
// ---Join Group
const joinGroup = async (req, res) => {
  try {
    const member = new Member({
      group_id: req.body.group_id,
      user_id: req.session.user._id
    })
    await member.save();
    res.send({ success: true, msg: 'You have successfully joined the group' });

  } catch (error) {
    res.send({ success: false, msg: error.message });
  }
}

// group chats
const groupChats = async (req, res) => {
  try {
    const myGroups = await Group.find({ creator_id: req.session.user._id })
    const joinedGroups = await Member.find({ user_id: req.session.user._id }).populate('group_id');

    res.render('chat-group', { myGroups: myGroups, joinedGroups: joinedGroups })
  } catch (error) {
    console.log(error.message);
  }
}

// saving group chat
const saveGroupChat = async (req, res) => {
  try {

    var chat = new GroupChat({
      sender_id: req.body.sender_id,
      group_id: req.body.group_id,
      message: req.body.message
    });

    var newChat = await chat.save();

    var cChat = await GroupChat.findOne({ _id: newChat._id }).populate('sender_id')


    res.send({ success: true, chat: newChat });
  } catch (error) {
    res.send({ success: false, msg: error.message });
  }
}


//loading Group chats
const loadGroupChats = async (req, res) => {
  try {
    const groupChats = await GroupChat.find({ group_id: req.body.group_id }).populate('sender_id');
    res.send({ success: true, chats: groupChats });
  } catch (error) {
    res.send({ success: false, msg: error.message });
  }
}


// delete group chats
const deleteGroupChat = async (req, res) => {
  try {
    await GroupChat.deleteOne({ _id: req.body.id });
    res.send({ success: true, msg: 'Chat Deleted' });
  } catch (error) {
    res.send({ success: false, msg: error.message });
  }
}


// update group chats
const updateGroupChat = async (req, res) => {
  try {
    await GroupChat.findByIdAndUpdate({ _id: req.body.id }, {
      $set: {
        message: req.body.message

      }
    });
    res.send({ success: true, msg: 'Chat Updated' });
  } catch (error) {
    res.send({ success: false, msg: error.message });
  }
}



module.exports = {
  registerLoad,
  register,
  loadLogin,
  login,
  logout,
  loadDashboard,
  saveChat,
  deleteChat,
  updateChat,
  loadGroups,
  createGroup,
  getMembers,
  addMembers,
  updateChatGroup,
  deleteChatGroup,
  shareGroup,
  joinGroup,
  groupChats,
  saveGroupChat,
  loadGroupChats,
  deleteGroupChat,
  updateGroupChat
}
