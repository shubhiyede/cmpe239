/**
 * Created by Shubhi Yede on 11/18/2015.
 */
var sentiment = require('sentiment');

module.exports = function(text) {
    return sentiment(text);
};