/**
 Object used for exporting an animation
 */
var Exporter = Exporter || function() {
    
    //==================
    // Private functions
    //==================
    
    function errorHandler(e) {
        var msg = '';
        
        switch (e.code) {
            case FileError.QUOTA_EXCEEDED_ERR:
                msg = "QUOTA_EXCEEDED_ERR";
                break;
            case FileError.NOT_FOUND_ERR:
                msg = "NOT_FOUND_ERR";
                break;
            case FileError.SECURITY_ERR:
                msg = "SECURITY_ERR";
                break;
            case FileError.INVALID_MODIFICATION_ERR:
                msg = "INVALID_MODIFICATION_ERR";
                break;
            case FileError.INVALID_STATE_ERR:
                msg = "INVALID_STATE_ERR";
                break;
            default:
                msg = "Unknown Error";
                break;
        };
        console.log("Error: " + msg);
    }
    
    //===========
    // Public API
    //===========
    
    API = {};
    
    API.exportAnimation = function(animation) {
        
        var exportAnimation = {};
    
        exportAnimation.r = Number(animation.rotationSpeed);
        exportAnimation.d = Number(animation.duration);
        exportAnimation.s = (animation.smooth) ? 1 : 0;
        exportAnimation.f = [];
        
        for (var i = 0; i < animation.frames.length; i++) {
            
            exportAnimation.f.push(animation.getFrameDuration(i));
            
            var segments = animation.getSegments(i);
            var color;
            var segmentString = "";
            for (var j = 0; j < segments.length; j++) {
                color = segments[j];
                segmentString += color.substring(1, 7); // Remove the # from the hex representation
            };
            exportAnimation.f.push(segmentString);
        }
        return exportAnimation;
    };

    API.exportJSON = function() {
        var animationJSON = {
            numSegments: animation.numSegments,
            frames: animation.frames,
            duration: animation.duration,
            rotationSpeed: animation.rotationSpeed
        };
        return animationJSON;
    };
    
    return API;
    
}();


