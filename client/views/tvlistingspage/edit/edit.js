var pageSession = new ReactiveDict();

Template.TvlistingspageEdit.rendered = function() {
	
};

Template.TvlistingspageEdit.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}

	
});

Template.TvlistingspageEdit.helpers({
	
});

Template.TvlistingspageEditEditForm.rendered = function() {
	

	pageSession.set("tvlistingspageEditEditFormInfoMessage", "");
	pageSession.set("tvlistingspageEditEditFormErrorMessage", "");

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

Template.TvlistingspageEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("tvlistingspageEditEditFormInfoMessage", "");
		pageSession.set("tvlistingspageEditEditFormErrorMessage", "");
		
		var self = this;

		function submitAction() {
			if(!t.find("#form-cancel-button")) {
				pageSession.set("tvlistingspageEditEditFormInfoMessage", "Saved.");
			}

			Router.go("tvlistingspage", {});
		}

		function errorAction(msg) {
			pageSession.set("tvlistingspageEditEditFormErrorMessage", "Error. " + msg);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Tvlistings.update({ _id: t.data.tvlisting._id }, { $set: values }, function(e) { if(e) errorAction(e.message); else submitAction(); });
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

Template.TvlistingspageEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("tvlistingspageEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("tvlistingspageEditEditFormErrorMessage");
	}
	
});
