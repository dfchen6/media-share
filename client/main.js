 Session.set("imageLimit", 8);

  lastScrollTop = 0;

  $(window).scroll(function(event){
    if($(window).scrollTop() + $(window).height() > $(document).height() -100 ){
      var scrollTop = $(this).scrollTop();
      if(scrollTop > lastScrollTop){
        Session.set("imageLimit", Session.get("imageLimit") + 4);
      }
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_AND_EMAIL"
  });

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
      if(Meteor.user()){
      Images.insert({
        img_src: img_src,
        img_alt: img_alt,
        createdAt: new Date(),
        createdBy: Meteor.user()._id
      });
      }
      console.log("Images have " + Images.find().count());
    },
    "click .btn-toggle": function(){
      console.log("Hello");
      if($('#closeButton').hasClass('btn-primary')){
        $('#closeButton').removeClass('btn-primary');
        $('#closeButton').removeClass('active');
        $('#closeButton').addClass('btn-default');
        $('#openButton').removeClass('btn-default');
        $('#openButton').addClass('active');        
        $('#openButton').addClass('btn-primary');      }
      else{
        $('#openButton').removeClass('btn-primary');
        $('#openeButton').removeClass('active');
        $('#openButton').addClass('btn-default');
        $('#closeButton').removeClass('btn-default');
        $('#closeButton').addClass('active');        
        $('#closeButton').addClass('btn-primary');
      }
    }
  });

  Template.newVideo.events({
      "submit .js-add-video": function(event){
        var video_src = event.target.video_src.value;
        var video_alt = event.target.video_alt.value;
        Videos.insert({
        video_src: video_src,
        video_alt: video_alt,
        createdAt: new Date(),
        createdBy: Meteor.user()._id
      });
        console.log("new video");
      }
  });

  Template.images.events({
    "click .imageDelete": function() {
      var image_id = this._id;
      // $("#" + image_id).hide('slow', function(){
      //   Images.remove(this._id);
      // })
      var toBeDeletedImage = Images.findOne({_id:image_id});
      var currentUserId = Meteor.user()._id;
      if(toBeDeletedImage.createdBy == currentUserId) {
        Images.remove(this._id);
      }
    },
    "click .js-set-image-filter": function(event) {
      Session.set("userFilter", this.createdBy);
    },
    "click .js-remove-filter": function(event) {
      Session.set("userFilter", null);
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
      if (Session.get("userFilter")){
        return Images.find({createdBy: Session.get("userFilter")}, {sort: {createdAt: -1}});
      }else {
        return Images.find({}, {sort: {createdAt: -1}, limit: Session.get("imageLimit")});
      }
    },
    getUser: function(user_id){
      var user = Meteor.users.findOne({_id:user_id});
      if(user){
        return user.username;
      }else{
        return "anon";
      }
    },
    filtering_images: function(){
      if (Session.get("userFilter")){
        return true;
    }
    else{
        return false;
    }
    }
  });

  Template.body.helpers({
    myUsername: function(){
    if (Meteor.user()){
      return Meteor.user().username;
    }
    else{
      console.log("Visitor");
      return "Visitor";
    }
    }
  });

  Template.videos.helpers({
    videos: function(){
      return Videos.find({}, {sort: {createdAt: -1}});
    }
  });