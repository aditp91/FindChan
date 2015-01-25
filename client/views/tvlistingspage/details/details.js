var pageSession = new ReactiveDict();

Template.TvlistingspageDetails.rendered = function() {
	
};

Template.TvlistingspageDetails.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}

	
});

Template.TvlistingspageDetails.helpers({
	
});

Template.TvlistingspageDetailsDetailsForm.rendered = function() {
	

	pageSession.set("tvlistingspageDetailsDetailsFormInfoMessage", "");
	pageSession.set("tvlistingspageDetailsDetailsFormErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();			
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

	$("input[autofocus]").focus();
};

Template.TvlistingspageDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("tvlistingspageDetailsDetailsFormInfoMessage", "");
		pageSession.set("tvlistingspageDetailsDetailsFormErrorMessage", "");
		
		var self = this;

		function submitAction() {
			if(!t.find("#form-cancel-button")) {
				pageSession.set("tvlistingspageDetailsDetailsFormInfoMessage", "Saved.");
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			pageSession.set("tvlistingspageDetailsDetailsFormErrorMessage", "Error. " + msg);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		Router.go("tvlistingspage", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("tvlistingspage", {});
	}

	
});

Template.TvlistingspageDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("tvlistingspageDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("tvlistingspageDetailsDetailsFormErrorMessage");
	}
	
});
