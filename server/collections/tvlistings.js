Tvlistings.allow({
	insert: function (userId, doc) {
		return true;
	},

	update: function (userId, doc, fields, modifier) {
		return true;
	},

	remove: function (userId, doc) {
		return true;
	}
});

Tvlistings.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;

	
});

Tvlistings.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Tvlistings.before.remove(function(userId, doc) {
	
});

Tvlistings.after.insert(function(userId, doc) {
	
});

Tvlistings.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Tvlistings.after.remove(function(userId, doc) {
	
});
