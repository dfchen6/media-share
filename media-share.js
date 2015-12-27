Tasks = new Mongo.Collection("tasks");
Images = new Mongo.Collection("images");
Videos = new Mongo.Collection("videos");
Articles = new Mongo.Collection("articles");

if (Meteor.isClient) {
  // counter starts at 0
  Router.map(function () {
  this.route('images');
  this.route('videos');
  this.route('articles');
  this.route('home', {
    path: '/',  //overrides the default '/home'
  });
});


  Template.newImage.events({
    "submit .js-add-image": function(event){
      console.log("Hehe");
      var img_src = event.target.img_src.value;
      var img_alt = event.target.img_alt.value;
      Images.insert({
        img_src: img_src,
        img_alt: img_alt,
        createdAt: new Date()
      });
      console.log("Images have " + Images.find().count());
    }
  });

  Template.newVideo.events({
      "submit .js-add-video": function(event){
        var video_src = event.target.video_src.value;
        var video_alt = event.target.video_alt.value;
        Videos.insert({
        video_src: video_src,
        video_alt: video_alt,
        createdAt: new Date()
      });
        console.log("new video");
      }
  });

  Template.images.events({
    "click .imageDelete": function() {
      var image_id = this._id;
      $("#" + image_id).hide('slow', function(){
        Images.remove(this._id);
      })
      Images.remove(this._id);
    }
  });

    Template.videos.events({
    "click .videoDelete": function() {
      var video_id = this._id;
      $("#" + video_id).hide('slow', function(){
        Videos.remove(this._id);
      })
      Videos.remove(this._id);
    }
  });

  Template.images.helpers({
    images: function(){
      return Images.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.videos.helpers({
    videos: function(){
      return Videos.find({}, {sort: {createdAt: -1}});
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
