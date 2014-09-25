
/**
 Renders a circle showing a number of icons
 @param canvas The canvas on which to render
 @param outerRadius
 @param innerRadius
 @param centerX Optional: The x-coordinate of the circle's center, defaults to the center of the canvas
 @param centerY Optional: The y-coordinate of the circle's center, defaults to the center of the canvas
 */
var IconRenderer = function(canvas, icons, outerRadiusArg, innerRadiusArg, centerXArg, centerYArg) {
    
    //==================
    // Private variables
    //==================
    var self = this;
    var ctx = canvas.getContext("2d");
    var innerRadius, outerRadius, centerX, centerY;
    
    var requestId = null;
    
    var lightColor = "#c1c2c7";
    var mediumColor = "#9045a2";
    var darkColor = "#77777a";

    
    var highLightIndex = -1;
    var segmentAngle = 2 * Math.PI / icons.length;
    
    if (typeof(centerXArg) == "undefined") {
        centerXArg = 0.5;
    }
    
    if (typeof(centerYArg) == "undefined") {
        centerYArg = 0.5;
    }
    
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    
    //==================
    // Private functions
    //==================
    
    /**
     Draws a single segment of the circle, together with its assigned icon
     @param i The index of the segment to draw
     @param color The color of the segment as a hex string, e.g. "#00ffaa"
     */
    function drawSegment(i, color) {
        var centerAngle = i * segmentAngle + Math.PI / 2;;
        var startAngle = centerAngle - segmentAngle / 2;
        var endAngle = centerAngle + segmentAngle / 2
        var img;
        
        // Draw the segment
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 5;
        ctx.fillStyle = color;
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, innerRadius, -startAngle, -endAngle, true);
        ctx.arc(centerX, centerY, outerRadius, -endAngle, -startAngle, false);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        
        // If the icon has not finished loading yet, return
        if (i >= icons.length) {
            return;
        }
        
        // Draw icons
        icon = icons[i];
        // @TODO: Enable different widths on icons
        var iconHeight = (outerRadius - innerRadius) / 2;
        var iconOffset = iconHeight;        
        icon.x = centerX + (outerRadius - iconOffset) * Math.cos(centerAngle) - iconHeight / 2;
        icon.y = centerY - (outerRadius - iconOffset) * Math.sin(centerAngle) - iconHeight / 2;
        
        //ctx.drawImage(icon, iconX, iconY, iconHeight, iconHeight);
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
     Draws the circle
     */
    this.show = function() {
        if (requestId) {
            return;
        }
        requestId = requestAnimationFrame(function() {
            updateSize();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            var color;
            // Draw each segment of the circle
            for (var i = 0; i < icons.length; i++) {
                color = (i === highLightIndex) ? lightColor : darkColor;
                drawSegment(i, color);
            }
            requestId = null;
        });
    }

    /**
     If the point (x, y) is within a pixel, the pixel's index is returned;
     otherwise, the function returns -1.
     */
    this.getIndex = function(x, y) {
        x = x - centerX;
        y = -(y - centerY);
        // Check if the coordinates are within the circle
        var length = Math.sqrt((x * x) + (y * y));
        if (length <= outerRadius && length >= innerRadius) {
            var angle = Math.atan2(y, x);
            angle = valueInRange(angle, 2 * Math.PI);
            angle -= Math.PI / 2;
            var index = Math.round(angle / (2 * Math.PI) * icons.length);
            index = valueInRange(index, icons.length);
            
            return index;
        }
        return -1;
    };
    
    /**
     Highlights a part of the circle
     */
    this.highLightIndex = function(index) {
        if (index >= 0 && index < icons.length) {
            highLightIndex = index;
        } else {
            console.error("Index " + index + " is not valid.");
        }
        self.show();
    }
    
    /**
     Shows the circle with no parts highlighted
     */
    this.highLightOff = function() {
        highLightIndex = -1;
        self.show();
    };
};