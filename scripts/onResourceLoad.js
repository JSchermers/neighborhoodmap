requirejs.onResourceLoad = function (context, map, depArray) {

	var loadingStatusEl = document.querySelector('.progress-loader'),
		showPageLoaded = document.querySelector('.show-when-files-loaded'),
		panel = document.querySelector('.requirejs-loading-panel');

    if (loadingStatusEl) {	

    	// we well call onResourceLoad(false) by ourselves when requirejs is not loading anything => 
    	// hide the indicator and exit
    	if (!context) { 
            panel.style.opacity = 0;
            // remove from aria
            panel.setAttribute("aria-hidden", true);

            showPageLoaded.style.opacity = 1;
            
            // add to aria
            showPageLoaded.setAttribute("aria-hidden", false);

            return;
        }
        
        // show indicator when any module is loaded and schedule requirejs status (loading/idle) check
        panel.style.display = ""; 
        clearTimeout(panel.ttimer); 
        
        panel.ttimer = setTimeout(function () {


            var context = require.s.contexts._;
            var inited = true;
            for (var name in context.registry) {
                var m = context.registry[name];

                if (inited !== true) {
                    inited = false;
                    break;
                }

            } // here the "inited" variable will be true, if requirejs is "idle", false if "loading"

            if (inited) {
                require.onResourceLoad(false);
            }

        }, 400);
        if (map && map.name) { 
        	// because it's roughly 17 files i devided 100/1
            loadingStatusEl.value =  loadingStatusEl.value += 3.3; 
            
        }
    } else {


    }

};