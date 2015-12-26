Tasks = new Mongo.Collection("tasks");
Images = new Mongo.Collection("images");
Videos = new Mongo.Collection("videos");
Articles = new Mongo.Collection("articles");

if (Meteor.isClient) {
  // counter starts at 0

  Template.body.helpers({
    events: function(){
      return Tasks.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.body.events({
    "submit .js-new-task": function(event){
      event.preventDefault();
      var text = event.target.text.value;
      console.log(text);
      Tasks.insert({
        text: text,
        createdAt: new Date()
      });
      console.log("Add to " + Tasks.find().count());
      event.target.text.value = "";
    },
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


  Template.task.events({
    "click .toggle-checked": function(){
      Tasks.update(this._id, {$set: {checked: ! this.checked}});
    },
    "click .delete": function (){
      Tasks.remove(this._id);
    }
  });

  Template.images.helpers({
    images: function(){
      return Images.find({}, {sort: {createdAt: -1}});
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
