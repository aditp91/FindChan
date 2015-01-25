var pageSession = new ReactiveDict();

Template.TvlistingspageInsert.rendered = function() {
	
};

Template.TvlistingspageInsert.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}

	
});

Template.TvlistingspageInsert.helpers({
	
});

Template.TvlistingspageInsertInsertForm.rendered = function() {
	

	pageSession.set("tvlistingspageInsertInsertFormInfoMessage", "");
	pageSession.set("tvlistingspageInsertInsertFormErrorMessage", "");

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

Template.TvlistingspageInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("tvlistingspageInsertInsertFormInfoMessage", "");
		pageSession.set("tvlistingspageInsertInsertFormErrorMessage", "");
		
		var self = this;

		function submitAction() {
			if(!t.find("#form-cancel-button")) {
				pageSession.set("tvlistingspageInsertInsertFormInfoMessage", "Saved.");
			}

			Router.go("tvlistingspage", {});
		}

		function errorAction(msg) {
			pageSession.set("tvlistingspageInsertInsertFormErrorMessage", "Error. " + msg);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Tvlistings.insert(values, function(e) { if(e) errorAction(e.message); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("tvlistingspage", {});
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.TvlistingspageInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("tvlistingspageInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("tvlistingspageInsertInsertFormErrorMessage");
	}
	
});
