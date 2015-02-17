var pageSession = new ReactiveDict();

Template.Tvlistingspage.rendered = function() {
	
};

Template.Tvlistingspage.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}

	
});

Template.Tvlistingspage.helpers({
	
});

/* Function to fetch a raw set of data, filter the data, or sort the data, and send it back
 */
var TvlistingspageViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	// define the conditions of the current viewable data set
	var searchString = pageSession.get("TvlistingspageViewSearchString");
	var sortBy = pageSession.get("TvlistingspageViewSortBy");
	var sortAscending = pageSession.get("TvlistingspageViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter by given search
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else { // this functionality is only when the user makes a search
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "channelname", "channelnumber", "cableprovider"];
		filtered = _.filter(raw, function(item) { // match each item in the search string
			var match = false;
			_.each(searchFields, function(field) {
				var value = (getPropertyValue(field, item) || "") + "";

				//now filter given reg ex value
				match = match || (value && value.match(regEx));
				if(match) {
					return false;
				}
			});
			return match;
		});
	}

	// sort by category
	if(sortBy) {
		filtered = _.sortBy(filtered, sortBy);

		// descending?
		if(!sortAscending) {
			filtered = filtered.reverse();
		}
	}

	return filtered;
};

var TvlistingspageViewExport = function(cursor, fileType) {
	var data = TvlistingspageViewItems(cursor);

	var exportFields = ['name', 'channelname', 'channelnumber', 'cableprovider'];

	var resultstring = convertArrayOfObjects(data, exportFields, fileType);
	var filename = "export." + fileType;

	downloadLocalResource(resultstring, filename, "");


};


Template.TvlistingspageView.rendered = function() {
	pageSession.set("TvlistingspageViewStyle", "table");
	
};

Template.TvlistingspageView.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},

	"click #dataview-search-button": function(e, t) {
		e.preventDefault();
		var form = $(e.currentTarget).parent();
		if(form) {
			var searchInput = form.find("#dataview-search-input");
			if(searchInput) {
				searchInput.focus();
				var searchString = searchInput.val();
				pageSession.set("TvlistingspageViewSearchString", searchString);
			}

		}
		return false;
	},

	"keydown #dataview-search-input": function(e, t) {
		if(e.which === 13)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					var searchString = searchInput.val();
					pageSession.set("TvlistingspageViewSearchString", searchString);
				}

			}
			return false;
		}

		if(e.which === 27)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					searchInput.val("");
					pageSession.set("TvlistingspageViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-tvragehttpget-button": function(e, t) {
		e.preventDefault();
		//Router.go("tvrage_informationprovider.getShows", {});

		Meteor.call('getShows',
			function (err, result) {
				if (err) {
					alert('Error: ' + err.message)
				} else {
					alert(JSON.stringify(result, null, 2))
				}
			});
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("tvlistingspage.insert", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		TvlistingspageViewExport(this.tvlistings, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		TvlistingspageViewExport(this.tvlistings, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		TvlistingspageViewExport(this.tvlistings, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		TvlistingspageViewExport(this.tvlistings, "json");
	}

	
});

Template.TvlistingspageView.helpers({
	"isEmpty": function() {
		return !this.tvlistings || this.tvlistings.count() == 0;
	},
	"isNotEmpty": function() {
		return this.tvlistings && this.tvlistings.count() > 0;
	},
	"isNotFound": function() {
		return this.tvlistings && pageSession.get("TvlistingspageViewSearchString") && TvlistingspageViewItems(this.tvlistings).length == 0;
	},
	"searchString": function() {
		return pageSession.get("TvlistingspageViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("TvlistingspageViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("TvlistingspageViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("TvlistingspageViewStyle") == "gallery";
	}

	
});


Template.TvlistingspageViewTable.rendered = function() {
	
};

Template.TvlistingspageViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("TvlistingspageViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("TvlistingspageViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("TvlistingspageViewSortAscending") || false;
			pageSession.set("TvlistingspageViewSortAscending", !sortAscending);
		} else {
			pageSession.set("TvlistingspageViewSortAscending", true);
		}
	}
});

Template.TvlistingspageViewTable.helpers({
	"tableItems": function() {
		return TvlistingspageViewItems(this.tvlistings);
	}
});


Template.TvlistingspageViewTableItems.rendered = function() {
	
};

Template.TvlistingspageViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		Router.go("tvlistingspage.details", {tvlisting_id: this._id});
		return false;
	},

	"click #delete-button": function(e, t) {
		e.preventDefault();
		var me = this;
		bootbox.dialog({
			message: "Delete? Are you sure?",
			title: "Delete",
			animate: false,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function() {
						Tvlistings.remove({ _id: me._id });
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});
		return false;
	},
	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("tvlistingspage.edit", {tvlisting_id: this._id});
		return false;
	}
});

Template.TvlistingspageViewTableItems.helpers({

});
