define(function () {
	// settings for conditioner - none yet  
    // constructor
    var exports = function (element,options) {      
        this.bindEvents(element);
        console.log(options);
    };

    p = exports.prototype;

    // unload (optional)
    p.unload = function () {

    };

    p.scollTo = function (element) {
        // get element position on screen
        var scroll = this.getOffsetRect(element);
        // scroll to element
        window.scroll(scroll.left, scroll.top);
    };

    p.getOffsetRect = function (element) {
        var box = element.getBoundingClientRect();
        
        var body = document.body;
        var docElem = document.documentElement;
        
        // (2)
        var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
        var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
        
        // (3)
        var clientTop = docElem.clientTop || body.clientTop || 0;
        var clientLeft = docElem.clientLeft || body.clientLeft || 0;
        
        // (4)
        var top  = box.top +  scrollTop - clientTop;
        var left = box.left + scrollLeft - clientLeft;
        
        return { 
            top: Math.round(top), 
            left: Math.round(left) };
        };


    p.bindEvents = function bindEvents (element) {
        window.addEventListener("getTitle", this.scollTo(element), false);
    };

    return exports;  
});