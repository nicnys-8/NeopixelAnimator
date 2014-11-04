var BallInterface = BallInterface || function() {
    var API = {},
        serverURL = "";

    API.setServerURL = function(url) {
        serverURL = url;
    };
    
    API.sendAnimation = function(animation) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", serverURL + "/api/animation", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify({data: Exporter.exportAnimation(animation)}));
    };

    API.sendAnimationByName = function(name) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", serverURL + "/api/animation", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify({name: name}));
    };
    
    API.stop = function() {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", serverURL + "/api/stop", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();
    };
    
    /**
     ...
     @param color A color on the form "#RRGGBB"
     */
    API.sendAmbient = function(color) {
        var xhr = new XMLHttpRequest();
        var rgb = ColorConvert.hexToRGB(color);
        var r = Math.round(rgb[0] * 255);
        var g = Math.round(rgb[1] * 255);
        var b = Math.round(rgb[2] * 255);
        var xhr = new XMLHttpRequest();
        
        xhr.open("POST", serverURL + "/api/ambient", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify({r: r, g: g, b: b}));
    };
    
    return API;
}();