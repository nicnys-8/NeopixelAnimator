var AnimationParser = AnimationParser || function() {
    "use strict";
    
    var API = {};
    
    API.parse = function(data) {
        
        var description = {
            numSegments: 24, // @TODO: Remove hard-coded value
            rotationSpeed: 0,
            frames: [],
            duration: 0,
            looping: true
        };
        
        var i;
        var totalFrames = 0;
        var numKeyFrames;
        
        // Count the total number of frames
        for (i = 0; i < data.f.length; i += 2) {
            totalFrames += (+data.f[i]) || 1;
        }
        
        description.rotationSpeed = (+data.r) || 0;
        description.duration = (+data.d) || 1;
        numKeyFrames = data.f.length / 2;
        
        for (i = 0; i < numKeyFrames; i++) {
            var frame = readFrame(data, i);
            description.frames.push(frame);
        }
                
        var a = new Animation(description);
        
        return a;
    };
    
    function readFrame(data, index) {
        var frame = {};
        var offset = index * 2; // 3,
        var rgbHex;
        var frames = data.f;
        var hexColors = frames[offset + 1]; // 2],
        var hexBase = "#";
        
        frame.segments = [];
        frame.duration = frames[offset];

        
        for (var i = 0; i < hexColors.length; i += 6) {
            rgbHex = hexBase + hexColors.slice(i, i + 6);
            frame.segments.push(rgbHex);
        }
        return frame;
    };
    
    return API;
}();

