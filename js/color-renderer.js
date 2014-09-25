
/**
 Renders a circle representation of a color animation
 @param canvas The canvas on which to render
 @param animation The animation to render
 @param outerRadius
 @param innerRadius
 @param centerX The x-coordinate of the circle's center
 @param centerY The y-coordinate of the circle's center
 */
var ColorRenderer = function(canvas, animation, outerRadiusArg, innerRadiusArg, centerXArg, centerYArg) {
    
    //==================
    // Private variables
    //==================
    var ctx = canvas.getContext("2d");
    var outerRadius, innerRadius, centerX, centerY;
    var timerId;
    var requestId = null;
    var rotationOffset = 0;
    var drawContours = false;
    var highlightIndex = -1;

    
    if (typeof(centerXArg) == "undefined") {
        centerXArg = 0.5;
    }
    
    if (typeof(centerYArg) == "undefined") {
        centerYArg = 0.5;
    }
    
    /**
     * Provides requestAnimationFrame in a cross browser way.
     */
    window.requestAnimationFrame = (function() {
        return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
            return window.setTimeout(callback, 1000 / 60);
        };
    })();
    
    /*
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    */
    
    //==================
    // Private functions
    //==================
    
    /**
     Draw the specified segment of the specified animation frame
     @param frame Index of the frame
     @param segment Index of the segment
     @param rotation A number specifying the rotation of the segment (@TODO: radians or degrees? Find out!)
     */
    function drawSegment(frame, segment, rotation) {
        if (typeof(rotation) === "undefined") {
            rotation = 0;
        }
        
        var segmentAngle = 2 * Math.PI / animation.numSegments;
        var startAngle = (Math.PI / 2) + segmentAngle * (segment - 0.5) + rotation;
        var endAngle = startAngle + segmentAngle;
        var hexColor = animation.getSegments(frame)[segment];
        
        // Draw the circle segment
        ctx.save();

        ctx.fillStyle = hexColor;
        ctx.strokeStyle = hexColor;
        ctx.beginPath();
        ctx.arc(centerX, centerY, innerRadius, -startAngle, -endAngle, true);
        ctx.arc(centerX, centerY, outerRadius, -endAngle, -startAngle, false);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();

        if (drawContours) {
            ctx.strokeStyle = "#000000";
            ctx.lineWidth = 1;
            ctx.stroke();
        }
        
        if (segment === highlightIndex) {
            ctx.clip();
            ctx.strokeStyle = "#ffff00";
            ctx.lineWidth = 8;
            ctx.stroke();
        }

        ctx.restore();
    }
    
    /**
     Updates size paramterers to match the current size of the canvas
     */
    function updateSize() {
        innerRadius = innerRadiusArg * canvas.width / 2;
        outerRadius = outerRadiusArg * canvas.width / 2;
        
        centerX = centerXArg * canvas.width;
        centerY = centerYArg * canvas.height;
    }
    
    /**
     @TODO: Add proper description
     */
    function valueInRange(value, range) {
        return ((value % range) + range) % range;
    }
    
    //=================
    // Public functions
    //=================
    
    /**
     Draws the specified frame, interpolated with the previous one
     */
    this.show = function(frame, rotation) {
        if (requestId) {
            return;
        }
        requestId = requestAnimationFrame(function() {
            updateSize();
            ctx.clearRect(0, 0, canvas.width, canvas.height);                         
            for (var i = 0; i < animation.numSegments; i++) {
                drawSegment(frame, i, rotation);
            }
            requestId = null;
        });
    };

    /**
     Stops the currently playing animation
     */
    this.stopAnimation = function() {
        console.warn("Deprecated function");
        clearTimeout(timerId);
        timerId = null;
    };
    
    /**
     If the point (x, y) is within a segment, the segment's index is returned;
     otherwise, the function returns -1.
     */
    this.getIndex = function(x, y) {
        x = x - centerX;
        y = -(y - centerY);
        
        var length = Math.sqrt((x * x) + (y * y));
        
        if (length <= outerRadius && length >= innerRadius) {
            var angle = Math.atan2(y, x);
            angle = valueInRange(angle, 2 * Math.PI);
            angle = angle - (Math.PI / 2); // Put angle zero at the top...
            var index = Math.round(angle / (2 * Math.PI) * animation.numSegments);
            index = valueInRange(index, animation.numSegments);
            return index;
        }
        return -1;
    };
    
    /*
    this.highLightSegment = function(frame, segment) {
        drawSegment(frame, segment, true, 0);
    }
    */

    this.highLightSegment = function(segment) {
        highlightIndex = segment;
    }
    
    this.setAnimation = function(arg) {
        animation = arg;
    };

    this.shouldDrawContours = function(bool) {
        drawContours = bool;
    }
};

