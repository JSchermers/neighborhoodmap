
requirejs.config({
 	map:{
        "*":{
            conditioner: 'libraries/conditioner'
        }
    },
    /* reference external libraries */
    paths: {
        "knockout": "libraries/knockout-3.3.0",
        /** 
		 * libraries for seperating templates into different files in knockout
		 * according to http://www.knockmeout.net/2013/05/knockout-amd-helpers-plugin.html
         **/
        "knockout-template": "libraries/knockout-template",
        "require-text": "libraries/require-text",
        "async": "libraries/async",
        "json": "libraries/json",
    }
});

// added for load event to view info while loading
require(["onResourceLoad"], function () {

    // added for require optimizer 
    require(["infrastructure"], function () {
        
        require(["knockout", "modules/main","conditioner", "knockout-template"], function (ko, App, conditioner) {
        /* look for modules here */
        ko.bindingHandlers.module.baseDir = "modules";

        ko.bindingHandlers.module.templateProperty = "embeddedTemplate";

        /* set amd defaults */
        ko.amdTemplateEngine.defaultPath = "../templates";
        ko.amdTemplateEngine.defaultSuffix = ".tmpl.html";
        ko.amdTemplateEngine.defaultRequireTextPluginName = "require-text";

        setTimeout(function () {
            ko.applyBindings(new App());
            // initialize conditioner
          }, 0);
        
        setTimeout(function () {
            conditioner.init();
        }, 300);


        });

    });
});