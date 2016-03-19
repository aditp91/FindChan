Meteor.methods({

    /*
        Method to get show listings using TVmaze API
     */
    getShows: function() {

        var countryCode = "/schedule?country=US"
        var BASE_URL = "http://api.tvmaze.com";
        var url = BASE_URL + countryCode;
        var result = "";
        this.unblock();

        // Make HTTP get request and display code and XML result
        try {
            console.log('Making request to TVmaze API: ' + url);
            result = HTTP.call('GET', url);
            console.log('Status code: ' + result.statusCode);
        } catch (e) {
            console.log('Exception calling TVmaze API', url);
            console.log("Response issue: ", result.statusCode);
            var errorJson = JSON.parse(result.content);
            throw new Meteor.Error(result.statusCode, errorJson.error);
        }

        /*
        //Parse the xml
        var extractedData = "";
        var parser = new xml2js.Parser(); //using xml2js object converter
        parser.parseString(result.content, function(err,result){
            // Extract the value from the data element
            extractedData = result['shows'];
        });
        */

        var array = JSON.parse(result.content);
        parseShows(array);
    }
});

function parseShows(showsArray) {
    // Make Show objects from JSON objects
    var showObjects = [];
    for (i=0; i < 5; i++) {
        //console.log("Show obj is: " + JSON.stringify(showsArray[i].show));
        if (showsArray[i].show.status === "Running") {
            var show_name = showsArray[i].show.name;
            var show_id = showsArray[i].show.id;
            var showobj = new Show(show_name, show_id);

            showobj.printDetails();
            showObjects.push(showobj);
        }
    }
    persistShows(showObjects);
}

// NEXT STEP IS TO PERSIST OBJECT TO DATABASE (if it doesn't exist already)
// TVLISTINGS TABLE + MAKE NEW TABLE FOR JUST SHOWS
function persistShows(showObjects) {
    console.log("Attempting to persist into Mongo collection: Tvlistings");

    //for (var showobj in showObjects) {
        Tvlistings.insert(showObjects[i], function (e) {
            if (e) errorAction(e.message); else submitAction();
        });
    //}
}


function Show(showname, showid) {
    this.name = showname;
    this.id = showid;

    this.printDetails = function() {
        console.log("Name: " + this.name + "\nID: " + this.id + "\n");
    }
}



