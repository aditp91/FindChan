Meteor.methods({

    /*
        Method to get show listings using TVRage API
     */
    getShows: function (showquery) {

        //change
        showquery = "walking";

        var BASE_URL = "http://services.tvrage.com/feeds/";
        var url = BASE_URL + 'search.php?show=' + showquery;
        var shows = "";
        var result = "";
        this.unblock();

        // Make HTTP get request and display code and XML result
        try {
            result = HTTP.call('GET', url);
            console.log(result.statusCode);
        } catch (e) {
            console.log('Exception calling', url);
            throw e;
        }

        // parse the xml
        var xmlDoc = $.parseXML(result.content);





        return shows;
    }



});