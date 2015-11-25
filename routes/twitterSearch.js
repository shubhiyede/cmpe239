/**
 * Created by Shubhi Yede on 11/18/2015.
 */
var util = require('util'),
    twit = require('twit'),
    sentimentAnalysis = require('./twitterSentimentAnalysis.js');

var config = {
    consumer_key: 'WhYExrBdjaQKyArMvJhxjHiHt',
    consumer_secret: 'WZ81G6ADuk2RJgGRVMsRZMGgJcUudbC7W2xdhTTx1Miqbhr68y',
    access_token: '2433226039-ALNzRIdqRR3StA2GZSXyPDuMJMhp5rm604BWktz',
    access_token_secret: 'nwUXQJsFraf4wd2SB8ls3BKQiB5uAWVEWO1Ea6cLk9ifB'
};


exports.getTweets = function getTweets(comp1, criteria, callback) {
    var twitterClient = new twit(config);
    var tweetsPolarity = [];
    var positive = 0;
    var negative = 0;
    var neutral = 0;
    var twitQuery = comp1 + ' ' + criteria + ' since:2015-01-01';
    var analysisResult;
    
    twitterClient.get('search/tweets', {q: twitQuery, count: 100}, function (err, data) {
          var totalTweets = data.statuses;
          var tweets = [];
          //console.log(JSON.stringify(totalTweets));
          //console.log("totalTweets.length="+totalTweets.length);
          for (var i = 0; i < totalTweets.length; i++) {
              totalTweets[i].text = totalTweets[i].text.replace(/^RT/, "");
              totalTweets[i].text = totalTweets[i].text.replace(/^ReTw/, "");
              tweets.push(totalTweets[i].text);
          }
          console.log("tweets.length="+tweets.length);
          analysisResult=sentimentAnalysis(tweets);
          /*
          tweetsPolarity.push(positive);
          tweetsPolarity.push(negative);
          tweetsPolarity.push(neutral);
          callback(err, tweetsPolarity, tweets);
          */
          callback(err, analysisResult, tweets);
      }
    );
}