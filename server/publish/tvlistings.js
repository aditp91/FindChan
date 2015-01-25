Meteor.publish("tvlistings", function() {
	return Tvlistings.find({}, {});
});

Meteor.publish("tvlistings_empty", function() {
	return Tvlistings.find({_id:null}, {});
});

Meteor.publish("tvlisting", function(tvlisting_id) {
	return Tvlistings.find({_id:tvlisting_id}, {});
});

