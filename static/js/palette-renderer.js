
/**
 Renders a cirular palette
 @param canvas The canvas on which to render
 @param radius
 @param centerX The x-coordinate of the circle's center
 @param centerY The y-coordinate of the circle's center
 */
var PaletteRenderer = function(canvas, radiusArg, centerXArg, centerYArg) {
    //==================
    // Private variables
    //==================
    var self = this;
    var ctx = canvas.getContext("2d");
    var intensity = 1.0;
    var requestId = null;

    var centerX;
    var centerY;
    var radius;

    var pickedX;
    var pickedY;
    
    if (typeof(centerXArg) == "undefined") {
        centerXArg = 0.5;
    }
    
    if (typeof(centerYArg) == "undefined") {
        centerYArg = 0.5;
    }
    
    var paletteImg = new Image();
    var paletteCanvas = document.createElement("canvas");

    updateSize();

    paletteImg.src = "img/color-circle.png";
    paletteImg.onload = function() {
        paletteCanvas.width = paletteImg.width;
        paletteCanvas.height = paletteImg.height;
        paletteCanvas.getContext("2d").drawImage(paletteImg, 0, 0);
        self.show();
    };
    
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    
    //==================
    // Private functions
    //==================
    
    /**
     Updates size paramterers to match the current size of the canvas
     */
    function updateSize() {
        radius = radiusArg * canvas.width / 2;
        centerX = centerXArg * canvas.width;
        centerY = centerYArg * canvas.height;
    }

    // Check if the specified point is within the circle
    function withinRadius(x, y) {
        var a = Math.pow((x - centerX), 2);
        var b = Math.pow((y - centerY), 2);
        var length = Math.sqrt(a + b);

        return (length <= radius);
    }
    
    //=================
    // Public functions
    //=================
    
    this.setIntensity = function(anIntensity) {
        intensity = anIntensity;
        this.show();
    };
    
    /**
     Draws the specified frame, interpolated with the previous one
     */
    this.show = function() {
        if (requestId) {
            return;
        }
        requestId = requestAnimationFrame(function() {
            updateSize();
            ctx.save();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);

            ctx.clip();
            ctx.drawImage(paletteCanvas, centerX - radius, centerY - radius, radius * 2, radius * 2);
            ctx.globalAlpha = (1.0 - intensity);
            ctx.fillStyle = "#000000";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.restore();
            
            requestId = null;
        });
    };

    
    /**
     Returns the color value at the given point
     */
    this.getColor = function(x, y) {
        if (!withinRadius(x, y)) {
            return null;
        }
        // Return the color value at the given point
        var imageData = ctx.getImageData(x, y, 1, 1);
        var pixel = imageData.data;
        return ColorConvert.RGBToHex([pixel[0] / 255, pixel[1] / 255, pixel[2] / 255]);
    };

    /*
    this.getSelectedColor = function() {
        return this.getColor(pickedX, pickedY);
    };
    */
};