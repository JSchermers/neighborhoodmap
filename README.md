# neighborhoodmap
project 5 from udacity course.

I wanted to keep everything in a modular way. Which i had never done before. I had heard of require so i wanted to give it a go. Then i needed a way to couple view to module with knockout, which knockout-amd-helpers solve.

## to run

* download project
* start local webserver from root, i used python -m http.server

## to minify use

* npm install -g requirejs
* r.js -o build.js (everything is copied and some are merged as well)
* start local webserver from dist to see it working with minified files as well

## uses

* require
* knockout-amd-helpers (to be compatible with require and seperating code)
* json
* async
* conditionerjs (conditionally load modules)
* r.js (require way of minifying stuff)

## doesn't use

* jquery (just wanted to try without, it doesn't make it easier though)

## tested in

* ie 11
* chrome
* firefox

## To make it even better, because it can always be better... sigh

* better error handling
* use kockout components instead of amd-helper
* set focus on onclick return to search
* find out to to know when all views have loaded so i can skip the settimeout in requireconfig for conditionerjs