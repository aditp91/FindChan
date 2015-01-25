Router.configure({
	templateNameConverter: "upperCamelCase",
	routeControllerNameConverter: "upperCamelCase",
	layoutTemplate: "layout",
	notFoundTemplate: "notFound",
	loadingTemplate: "loading"
});

if(Meteor.isClient) {
	Router.onBeforeAction(function() {
		// loading indicator here
		if(!this.ready()) {
			$("body").addClass("wait");
		} else {
			$("body").removeClass("wait");
			this.next();
		}
	});
}

Router.map(function () {

	this.route("home", {path: "/", controller: "HomeController"});
	this.route("tvlistingspage", {path: "/tvlistingspage", controller: "TvlistingspageController"});
	this.route("tvlistingspage.insert", {path: "/tvlistingspage/insert", controller: "TvlistingspageInsertController"});
	this.route("tvlistingspage.details", {path: "/tvlistingspage/details/:tvlisting_id", controller: "TvlistingspageDetailsController"});
	this.route("tvlistingspage.edit", {path: "/tvlistingspage/edit/:tvlisting_id", controller: "TvlistingspageEditController"});/*ROUTER_MAP*/
});
