({
    mainConfigFile : "scripts/require-config.js",
    baseUrl : "scripts",
    removeCombined: true,
    appDir: "./",
    findNestedDependencies: true,
    dir: "dist",
    optimizeCss: "standard",
    modules: [
    	{
    		name: "require-config",

    		exclude: [
    			"infrastructure"
    		]
    	},
	  	{
            name: "infrastructure"
        }
    ]

})