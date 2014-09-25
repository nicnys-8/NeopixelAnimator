function Tool() {
    // Private variables
    var states = {"draw": "Click a segment to color it.",
                   "copyA": "Click a segment to copy its color.",
                   "copyB": "Click a segment to copy its color.",
                   "gradientStart": "Click a segment to start drawing a gradient",
                   "gradientEnd": "Click a segment to finish the gradient."};
    var currentState = "draw";
    var previousState = currentState;
    
    // A list of functions that are called when the current tool changes
    var onChangeFunctions = [];
    
    // Public functions
    this.setState = function(state) {
        
        // Check if the input is a valid tool
        if (!states.hasOwnProperty(state)) {
            console.error(state + " is not a valid tool.");
            return;
        }
        
        previousState = currentState;
        currentState = state;
        
        // Run all tool change events
        for (var i = 0; i < onChangeFunctions.length; i++) {
            onChangeFunctions[i](state);
        }
    };
    
    this.getState = function() {
        return currentState;
    };
    
    this.getPreviousState = function() {
        return previousState;
    };
    
    this.getDescription = function(tool) {
        return states[tool];
    };
    
    this.onToolChange = function(func) {
        onChangeFunctions.push(func);
    };
};