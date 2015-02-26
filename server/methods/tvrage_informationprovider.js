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

        // Parse the xml
        var extractedData = "";
        var parser = new xml2js.Parser(); //using xml2js object converter
        parser.parseString(result.content, function(err,result){
            // Extract the value from the data element
            extractedData = result['Results'];
        });

        //console.log(util.inspect(extractedData, false, null));

        var show_1 = extractedData.show[0].name[0];
        console.log(show_1);

        return shows;
    }



});