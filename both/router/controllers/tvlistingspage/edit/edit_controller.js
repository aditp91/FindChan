this.TvlistingspageEditController = RouteController.extend({
	template: "TvlistingspageEdit",

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		/*BEFORE_FUNCTION*/
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("loading"); }
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("tvlisting", this.params.tvlisting_id)
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		

		return {
			params: this.params || {},
			tvlisting: Tvlistings.findOne({_id:this.params.tvlisting_id}, {})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
	}
});