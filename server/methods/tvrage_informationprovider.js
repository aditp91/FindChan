/**
 * Created by Adi on 2/11/15.
 */


Meteor.methods({

    getShows: function (showquery) {

        //change
        showquery = "buffy";

        var BASE_URL = "http://services.tvrage.com/feeds/";
        var url = BASE_URL + 'search.php?show=' + showquery;
        var shows = "";
        this.unblock();

        Meteor.http.get(url, function (error, result) {

            shows = result.statusCode;
            console.log(shows);
        });

        return shows;

    }



});