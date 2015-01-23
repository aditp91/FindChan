this.App = {};
this.Helpers = {};

Meteor.startup(function() {
	
});

this.menuItemClass = function(routeName) {
	if(!Router.current() || !Router.current().route) {
		return "";
	}

	if(!Router.routes[routeName]) {
		return "";
	}

	var currentPath = Router.routes[Router.current().route.getName()].handler.path;
	var routePath = Router.routes[routeName].handler.path;

	if(routePath === "/") {
		return currentPath == routePath ? "active" : "";
	}

	return currentPath.indexOf(routePath) === 0 ? "active" : "";
};

Helpers.menuItemClass = function(routeName) {
	return menuItemClass(routeName);
};

Helpers.randomString = function(strLen) {
	return Random.id(strLen);
};

Helpers.secondsToTime = function(seconds, timeFormat) {
	return secondsToTime(seconds, timeFormat);
};

Helpers.integerDayOfWeekToString = function(day) {
	if(_.isArray(day)) {
		var s = "";
		_.each(day, function(d, i) {
			if(i > 0) {
				s = s + ", ";
			}
			s = s + ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][d];
		});
		return s;
	}
	return ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][day];
};

Helpers.formatDate = function(date, dateFormat) {
	if(!date) {
		return "";
	}

	var f = dateFormat || "MM/DD/YYYY";
	return moment(date).format(f);
};

Helpers.integerToYesNo = function(i) {
	return i ? "Yes" : "No";
};

Helpers.integerToTrueFalse = function(i) {
	return i ? "True" : "False";
};

_.each(Helpers, function (helper, key) {
	Handlebars.registerHelper(key, helper)
});

