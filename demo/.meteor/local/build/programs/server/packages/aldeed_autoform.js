(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var SimpleSchema = Package['aldeed:simple-schema'].SimpleSchema;
var MongoObject = Package['aldeed:simple-schema'].MongoObject;
var check = Package.check.check;
var Match = Package.check.Match;

(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/aldeed:autoform/autoform-common.js                       //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
// This is the only file that is run on the server, too              // 1
                                                                     // 2
// Extend the schema options allowed by SimpleSchema                 // 3
SimpleSchema.extendOptions({                                         // 4
  autoform: Match.Optional(Object)                                   // 5
});                                                                  // 6
///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['aldeed:autoform'] = {};

})();

//# sourceMappingURL=aldeed_autoform.js.map
