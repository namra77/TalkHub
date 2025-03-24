// controllers/videoController.js
const videoController = {
  getVideoPage: (req, res) => {
      // Check if 'roomID' is passed via query params
      const roomID = req.query.roomID || Math.floor(Math.random() * 10000).toString();
      
      // Render the video.ejs view and pass roomID to it
      res.render('video', { roomID }); 
  },
};

module.exports = videoController;
