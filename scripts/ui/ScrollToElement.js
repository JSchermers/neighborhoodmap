define(function () {
	// settings for conditioner - none yet  
    // constructor
    var exports = function (element,options) {   
        this.bindEvents(element);
    };

    p = exports.prototype;

    p.setHeight = function (element) {
        
        // get viewport height - scrollbar
        var winHeigt = document.documentElement.clientHeight,

        // get footerelement to substract
        footer = document.querySelector(".js-footer"),

        // get height minus footer so it stays visible since wikipedia always returns 9 elements max.
        height = winHeigt - footer.offsetHeight;

        // set element height so after scroll wikipedia is placed in top of screen
        element.style.height = height + "px";        
    };

    p.scollTo = function (element) {

        // get element position on screen
        var scroll = this.getOffsetRect(element);
        // scroll to element
        window.scroll(scroll.left, scroll.top);
    };

    // get position on page
    p.getOffsetRect = function (element) {
        var box = element.getBoundingClientRect();
        
        var body = document.body;
        var docElem = document.documentElement;
        
        var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
        var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
        
        var clientTop = docElem.clientTop || body.clientTop || 0;
        var clientLeft = docElem.clientLeft || body.clientLeft || 0;

        var top  = box.top + scrollTop - clientTop;
        var left = box.left + scrollLeft - clientLeft;
        
        return { 
            top: Math.round(top), 
            left: Math.round(left) };
        };


    p.bindEvents = function (element) {

        // listen to getTitle event
        window.addEventListener("getTitle", function () {
            var el = element;

                // set the height of the element so scroll placeds the element in full display to set focus to user
                p.setHeight(el); 

                // scroll to element
                p.scollTo(el);
        }, false);
    };

    return exports;  
});