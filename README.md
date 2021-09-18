# ionic-sqlite

## creating the project
project creation: `ionic start ionic-sqlite tabs --type=angular --cordova`   
adding the angular material: `ng add @angular/material`   

## adding sqlite and sqliteporter to the project
`npm install @ionic-native/core`   
`ionic cordova plugin add cordova-sqlite-storage`   
`npm install @ionic-native/sqlite`   
   
`ionic cordova plugin add uk.co.workingedge.cordova.plugin.sqliteporter`   
`npm install @ionic-native/sqlite-porter --save`

## adding the android platform and running the project
`npm install -g cordova-res`   
`ionic cordova platform add android`   
   
`ionic cordova run android --device`
