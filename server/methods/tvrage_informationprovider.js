Meteor.methods({

    /*
        Method to get show listings using TVRage API
     */
    getShows: function (showquery) {

        //change
        showquery = "arrow";

        var BASE_URL = "http://services.tvrage.com/feeds/";
        var url = BASE_URL + 'search.php?show=' + showquery;
        var shows = "";
        this.unblock();

        // Make HTTP get request and display code and XML result
        try {
            shows = HTTP.call('GET', url);
            console.log(shows.statusCode);
        } catch (e) {
            console.log('Exception calling', url);
            throw e;
        }

        return shows;
    }



});