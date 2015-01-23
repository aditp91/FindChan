var pageSession = new ReactiveDict();

Template.CustomersDetails.rendered = function() {
	
};

Template.CustomersDetails.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}

	
});

Template.CustomersDetails.helpers({
	
});

Template.CustomersDetailsDetailsForm.rendered = function() {
	

	pageSession.set("customersDetailsDetailsFormInfoMessage", "");
	pageSession.set("customersDetailsDetailsFormErrorMessage", "");

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

Template.CustomersDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("customersDetailsDetailsFormInfoMessage", "");
		pageSession.set("customersDetailsDetailsFormErrorMessage", "");
		
		var self = this;

		function submitAction() {
			if(!t.find("#form-cancel-button")) {
				pageSession.set("customersDetailsDetailsFormInfoMessage", "Saved.");
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			pageSession.set("customersDetailsDetailsFormErrorMessage", "Error. " + msg);
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

		Router.go("customers", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("customers", {});
	}

	
});

Template.CustomersDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("customersDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("customersDetailsDetailsFormErrorMessage");
	}
	
});
