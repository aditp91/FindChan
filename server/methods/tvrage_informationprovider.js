Meteor.methods({

    /*
        Method to get show listings using TVRage API
     */
    getShows: function() {

        //change
        var showlist = "show_list.php";

        var BASE_URL = "http://services.tvrage.com/feeds/";
        var url = BASE_URL + showlist;
        var result = "";
        this.unblock();

        // Make HTTP get request and display code and XML result
        try {
            console.log('Making request to TVRage API: ' + url);
            result = HTTP.call('GET', url);
            console.log('Status code: ' + result.statusCode);
        } catch (e) {
            console.log('Exception calling TVRage API', url);
            throw e;
        }

        // Parse the xml
        var extractedData = "";
        var parser = new xml2js.Parser(); //using xml2js object converter
        parser.parseString(result.content, function(err,result){
            // Extract the value from the data element
            extractedData = result['shows'];
        });

        // Make Show objects from xml entities
        for (i=0; i < 50; i++) {
            if (extractedData.show[i].status[0] === '1') {
                var show_name = extractedData.show[i].name[0];
                var show_id = extractedData.show[i].id[0];
                var showobj = new Show(show_name, show_id);

                // NEXT STEP IS TO PERSIST OBJECT TO DATABASE (if it doesn't exist already)
                // TVLISTINGS TABLE + MAKE NEW TABLE FOR JUST SHOWS
                showobj.getDetails();
                console.log("Attempting to persist into Mongo collection: Tvlistings");

                // Need to somehow insert using 'submit' action's functionality
                Tvlistings.insert(values, function(e) { if(e) errorAction(e.message); else submitAction(); });

            }
        }
    }
});

function Show(showname, showid) {
    this.name = showname;
    this.id = showid;

    this.getDetails = function() {
        console.log("Name: " + this.name + "\nID: " + this.id + "\n");
    }
}


