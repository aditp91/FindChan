
var Channel_List = new Mongo.Collection("channel_list");
var TVShow_List = new Mongo.Collection("tvshow_list");
var CableProvider_List = new Mongo.Collection("cableprov_list");

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault("counter", 0);

  Template.body.helpers({
    channel_list: function () {
      if (Session.get("hideCompleted")) {
        // If hide completed is checked, filter channels
        return Channel_List.find({checked: {$ne: true}}, {sort: {name: 1}});
      } else {
        // Otherwise, return all of the channels
        return Channel_List.find({}, {sort: {name: 1}});
      }
    },
    hideCompleted: function () {
      return Session.get("hideCompleted");
    },
    incompleteCount: function () {
      return Channel_List.find({checked: {$ne: true}}).count();
    }
  });

  Template.body.events({
    "submit .new-inputform": function (event) {
      // This function is called when the new channel form is submitted
      var text = event.target.channelinputtext.value;
      // console.log(event);
      Channel_List.insert({
        name: text,
        checked: false
      });
      // Clear form
      event.target.channelinputtext.value = "";
      // Prevent default form submit
      return false;
    },
    "change .hide-completed input": function (event) {
      Session.set("hideCompleted", event.target.checked);
    },
    "click .regular-button": function (event, template) {
      var show = template.find('#showinputtext').value;
      var cableprov = template.find('#cableinputtext').value;

      if (show === "" || cableprov === "") {
        $('#query-label').text("BAD INPUT");
      }
    }


  });

  Template.channel.events({
    "click .toggle-checked": function () {
      // Set the checked property to the opposite of its current value
      Channel_List.update(this._id, {$set: {checked: ! this.checked}});
    },
    "click .delete": function () {
      Channel_List.remove(this._id);
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
