/**
 Functions for converting colors between "#RRGGBB" and [r, g, b]
 (hex string to normalized float array)
 */
var ColorConvert = function() {
    
    var hexStr = "0123456789abcdef", maskUpper = 0xf0, maskLower = 0x0f, norm = 1.0 / 255.0;
    var API = {};
    
    function clamp(val, lower, upper) {
        return (val < lower) ? lower : (val > upper) ? upper : val;
    }
    
    API.hexToRGB = function(value, dst) {
        if (!dst) { dst = []; }
        var R = ((hexStr.indexOf(value[1])) << 4 | hexStr.indexOf(value[2])) * norm,
        G = ((hexStr.indexOf(value[3])) << 4 | hexStr.indexOf(value[4])) * norm,
        B = ((hexStr.indexOf(value[5])) << 4 | hexStr.indexOf(value[6])) * norm;
        dst[0] = R;
        dst[1] = G;
        dst[2] = B;
        return dst;
    };
    
    API.RGBToHex = function(rgb) {
        var R, G, B, hex;
        R = clamp(Math.round(rgb[0] * 255), 0, 255);
        G = clamp(Math.round(rgb[1] * 255), 0, 255);
        B = clamp(Math.round(rgb[2] * 255), 0, 255);
        hex = "#" + hexStr[(R & maskUpper) >> 4] + hexStr[R & maskLower] +
        hexStr[(G & maskUpper) >> 4] + hexStr[G & maskLower] +
        hexStr[(B & maskUpper) >> 4] + hexStr[B & maskLower];
        return hex;
    };
    
    API.HSVToRGB = function(hsv, dst) {
        var rgb, H, i, data,
        h = hsv[0], s = hsv[1], v = hsv[2];
        
        if (s === 0) {
            rgb = [v, v, v];
        } else {
            H = h / 60.0;
            i = Math.floor(H);
            data = [v * (1.0 - s),
                    v * (1.0 - s * (H - i)),
                    v * (1.0 - s * (1.0 - (H - i)))];
            
            switch(i) {
                case 0: rgb = [v, data[2], data[0]]; break;
                case 1: rgb = [data[1], v, data[0]]; break;
                case 2: rgb = [data[0], v, data[2]]; break;
                case 3: rgb = [data[0], data[1], v]; break;
                case 4: rgb = [data[2], data[0], v]; break;
                default: rgb = [v, data[0], data[1]]; break;
            }
        }
        if (dst) {
            dst[0] = rgb[0];
            dst[1] = rgb[1];
            dst[2] = rgb[2];
        } else {
            dst = rgb;
        }
        
        return dst;
    };
    
    API.HSVToHex = function(hsv, dst) {
        return API.RGBToHex(API.HSVToRGB(hsv), dst);
    };
    
    return API;
}();



