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

        var array = JSON.parse(result.content);
        //parseShows(array);
    }
});

function parseShows(showsArray) {
    // Make Show objects from JSON objects
    var showObjects = [];
    for (var i=0; i < 200; i++) {
        //console.log("Show obj is: " + JSON.stringify(showsArray[i].show));
        if ((showsArray[i] != null) && showsArray[i].show.status === "Running") {
            var show_name = showsArray[i].show.name;
            var show_id = showsArray[i].show.id;
            var show_channel_name = showsArray[i].show.network.name;
            var show_channel_number = showsArray[i].show.network.id;

            var showobj = new Show(show_name, show_id, show_channel_number, show_channel_name);

            showobj.printDetails();
            showObjects.push(showobj);
        }
    }
    persistShows(showObjects);
}

// NEXT STEP IS TO PERSIST OBJECT TO DATABASE (if it doesn't exist already)
// TVLISTINGS TABLE + MAKE NEW TABLE FOR JUST SHOWS
function persistShows(showObjects) {
    console.log("Attempting to persist into TVListings collection: Tvlistings");

    for(var x=0; x < showObjects.length; x++) {
        Tvlistings.insert(showObjects[x], function (e) {
            if (e) errorAction(e.message);
        });
    }
}

function Show(showname, showid, chanNum, chanName) {
    this.id = showid;
    this.name = showname;
    this.channelname = chanName;
    this.channelnumber = chanNum;
    this.cableprovider = "Verizon FiOS";

    this.printDetails = function() {
        console.log("Name: " + this.name + "\nID: " + this.id +
            "\nChannel Name: " + this.channelname + "\nChannel Number: " + this.channelnumber +"\n");
    }
}



