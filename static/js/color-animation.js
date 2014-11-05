/**
 An object that describes and controls a color animation
 @param description A description of the animation on the following form:
 description = {
    frames = <frame array>,
    numSegments = <number>,
    duration = <number>
 };
 */
var Animation = function(description) {

    //==================
    // Private variables
    //==================
    // If a description is not provided, initialize the animation
    if (typeof(description) === "undefined") {
        var firstFrame = {
            segments: [],
            rotation: 0,
            duration: 1,
        }
        
        this.frames = [firstFrame];
        this.numSegments = 24;
        this.rotationSpeed = 0;
        this.duration = 1;
    } else {
        this.numSegments = description.numSegments;
        this.frames = description.frames;
        this.duration = description.duration;
        this.rotationSpeed = Number(description.rotationSpeed);
    };
    
    //==================
    // Private functions
    //==================
    
    /**
     Returns the linear interpolation of 'fromRGB' and 'toRGB'
     (on the form [number R, number G, number B]),
     interpolated with amount 'lerpAmount'
     */
    function lerp(fromRGB, toRGB, lerpAmount) {
        return [toRGB[0] * lerpAmount + fromRGB[0] * (1 - lerpAmount),
                toRGB[1] * lerpAmount + fromRGB[1] * (1 - lerpAmount),
                toRGB[2] * lerpAmount + fromRGB[2] * (1 - lerpAmount)];
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
     Set the color of the specified segment in the specified frame
     */
    this.setSegmentColor = function(frame, segment, color) {
        segment = valueInRange(segment, this.numSegments);
        segmentValue = {};
        this.frames[frame].segments[segment] = color;
    };
    
    /**
     Paints all segments in a frame in the specified color
     @frame The frame to fill
     @param color The specified color, in hex form
     */
    this.fill = function(frame, color) {
        for (var i = 0; i < this.numSegments; i++) {
            this.setSegmentColor(frame, i, color);
        }
    }
    
    /**
     Draw a gradient between segment the segments at 'startSegment' and 'endSegment',
     from interpolated from 'startColor' to 'endColor'
     */
    this.drawGradient = function(frame, startSegment, endSegment, startColor, endColor) {
        
        if (startSegment === endSegment) {
            return;
        }
        
        var rgbStart;
        var rgbEnd;
        var lerpAmount;
        var color;
        
        // We map startSegment to 12, to avoid weird behavior
        var offset = 12 - startSegment;
        startSegment += offset;
        endSegment = valueInRange(endSegment + offset, this.numSegments);
        
        // This can be done in a nicer way...
        if (startSegment < endSegment) {
            for (var i = startSegment; i <= endSegment; i++) {
                rgbStart = ColorConvert.hexToRGB(startColor);
                rgbEnd = ColorConvert.hexToRGB(endColor);
                lerpAmount = (endSegment - i) / (endSegment - startSegment);
                color = ColorConvert.RGBToHex(lerp(rgbStart, rgbEnd, lerpAmount));
                this.setSegmentColor(frame, i - offset, color);
            }
        } else {
            for (var i = startSegment; i >= endSegment; i--) {
                rgbStart = ColorConvert.hexToRGB(startColor);
                rgbEnd = ColorConvert.hexToRGB(endColor);
                lerpAmount = (endSegment - i) / (endSegment - startSegment);
                color = ColorConvert.RGBToHex(lerp(rgbStart, rgbEnd, lerpAmount));
                this.setSegmentColor(frame, i - offset, color);
            }
        }
    };
    
    this.duplicateFrame = function(frame) {
        // Copy the data in the current frame
        var segments = [];
        for (var i = 0; i < animation.getSegments(frame).length; i++) {
            segments[i] = animation.getSegments(frame)[i];
        }
        var newFrame = {
        segments: segments,
        //rotation: animation.getRotation(frame),
        duration: animation.getFrameDuration(frame),
        //lerpSteps: animation.getLerpSteps(frame)
        };
        this.frames.splice(frame, 0, newFrame);
        updateUI();
    }
    
    this.deleteFrame = function(frame) {
        if (frame < 0 || frame > (this.frames.length - 1)) {
            console.error("Frame " + frame + " cannot be deleted.");
        } else {
            this.frames.splice(frame, 1);
        }
    }
    
    this.getSegments = function(frame) {
        return this.frames[frame].segments;
    };
    
    /*
    this.getRotation = function(frame) {
        return frames[frame].rotation;
    };
    
    this.setRotation = function(frame, rotation) {
        frames[frame].rotation = rotation;
    };
    */

    this.getFrameDuration = function(frame) {
        return Number(this.frames[frame].duration);
    };
    
    this.setFrameDuration = function(frame, duration) {
        this.frames[frame].duration = duration;
    };
    
    /*
    this.getLerpSteps = function(frame) {
        return this.frames[frame].lerpSteps;
    };
    
    this.setLerpSteps = function(frame, lerpSteps) {
        this.frames[frame].lerpSteps = lerpSteps;
    };
    */
};