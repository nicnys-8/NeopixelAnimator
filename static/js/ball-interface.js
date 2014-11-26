
/**
An object for sending HTTP requests to a Smart Ball
*/

var BallInterface = function() {
    var API = {},
        serverURL = "",
        TEMP_NAME = "temp";

    /**
    Sets the URL of the server which will receive all requests
    @param url The URL of the target server, e.g. "http://bollen.local:8000"
    */
    API.setServerURL = function(url) {
        serverURL = url;
    };

    /**
    Retrieves all animations stored on the ball
    @param callBack A function that is called with the list of animations as argument
    */
    API.getAnimations = function(callback) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                callback(xhr.responseText);
            }
        }
        xhr.open("GET", serverURL + "/api/animations", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();
    };
    
    /**
    Makes the ball play a specified animation, storing it on the server
    */
    API.playAnimation = function(animation, name) {
        var xhr = new XMLHttpRequest();
        if (typeof(name) === "undefined") {
            name = TEMP_NAME;
        }
        xhr.open("POST", serverURL + "/api/animation/" + name, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(Exporter.exportAnimation(animation)));
    };

    /**
    Makes the ball play a specified animation
    */
    API.playAnimationByName = function(name) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", serverURL + "/api/animation/" + name, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();
    };
    
    API.stop = function() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", serverURL + "/api/stop", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();
    };

    /**
    Makes the surrounding strip display the specified colors
    @param color A string describing the color of each pixel in hexadecimal
        (e.g. the string "FF0000FF0033FF2200...", 6*48 characters long)
    */
    API.setStrip = function(colors) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", serverURL + "/api/direct/strip/f/" + colors, true);//@TODO: SOMETHING ELSE
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();
    };

    /**
    Makes the front ring display the specified colors
    @param color A string describing the color of each pixel in hexadecimal
        (e.g. the string "FF0000FF0033FF2200...", 6*24 characters long)
    */
    API.setRing = function(colors) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", serverURL + "/api/direct/ring/f/" + colors, true);//@TODO: SOMETHING ELSE
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();
    };

    /**
    Makes the entire surrounding strip display a single specific color
    @param color A string describing the color in hexadecimal (e.g. "FF0000" for red)
    */
    API.setStripUniform = function(color) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", serverURL + "/api/direct/strip/u/" + color, true);//@TODO: SOMETHING ELSE
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();
    };

    /**
    Makes the front ring display a single specific color
    @param color A string describing the color in hexadecimal (e.g. "FF0000" for red)
    */
    API.setRingUniform = function(color) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", serverURL + "/api/direct/ring/u/" + color, true);//@TODO: SOMETHING ELSE
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();
    };

    /**
    Sets the color of a specific pixel on the surrounding strip
    @param color A string describing the color in hexadecimal (e.g. "FF0000" for red)
    @param pixel An integer (0-47) specifying the index of the pixel
    */
    API.setStripPixel = function(pixel, color) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", serverURL + "/api/direct/strip/p/" + pixel + "/" + color, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();
    };

    /**
    Sets the color of a specific pixel on the front ring
    @param color A string describing the color in hexadecimal (e.g. "FF0000" for red)
    @param pixel An integer (0-23) specifying the index of the pixel
    */
    API.setRingPixel = function(pixel, color) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", serverURL + "/api/direct/ring/p/" + pixel + "/" + color, true);//@TODO: SOMETHING ELSE
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();
    };

    /**
    Sets the brightness on all the lights
    @param value An integer between 0 and 255
    */
    API.setBrightness = function(value) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", serverURL + "/api/brightness/" + value, true);//@TODO: SOMETHING ELSE
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();
    };

    /**
    Plays the startup animation
    */
    API.playStartup = function() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", serverURL + "/api/startup", true);//@TODO: SOMETHING ELSE
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();
    };
    
    return API;
}();