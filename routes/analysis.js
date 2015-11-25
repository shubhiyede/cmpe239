/**
 * Created by shubhiyede on 17/11/2015.
 */
var mysql = require('./mysql');
var tweetStats = require('./twitterSearch');

exports.getStats = function (req, res) {

    var compFirst = req.param("comp1");//.toLowerCase().trim();
    var criteria = "";//"stock equity asset liability revenue EBITDA profit loss cash up down";
    //var compSecond = req.param("comp2").toLowerCase().trim();
    var getStats = "select * from mytable1 where Company_Name='" + compFirst + "'";
    console.log(getStats);
    var polarity = [0,0,0];
    var analysisResult;
    tweetStats.getTweets(compFirst, criteria, function (err, result, twits) {
        if (err) {

            throw err;
        }

        analysisResult = result;
        var tweets = twits;
        console.log("score="+analysisResult.score);

        mysql.fetchData(getStats, function (err, rows) {
            console.log("rows="+rows.length);
            if (rows.length < 3) {

                res.render('index', {error: "Error"});
                console.log(err);

            }
            else {
                //console.log("pol..." + polarity);
                
                var year2012="2012";
                var year2013="2013";
                var year2014="2014";
                var i;
                var comp1 = [];
                var comp2 = [];
                var current_Share_Value=1;
                
                for (var i = 0; i < rows.length; i++) {
                  
                    if (rows[i].Company_Name.toUpperCase() === compFirst.toUpperCase()) {
                        comp1.push(rows[i]);
                        console.log(rows[i].Share_Values);
                        if(rows[i].Year.toUpperCase() === year2014.toUpperCase()){
                          current_Share_Value=rows[i].Share_Values;
                        }
                    }
                    else if (rows[i].Company_Name.toUpperCase() === compSecond.toUpperCase()) {
                        comp2.push(rows[i]);
                    }
                }
                var avg = (comp1[0].Share_Values+comp1[1].Share_Values+comp1[2].Share_Values)/3;
                var increase_by = avg-current_Share_Value;
                var predict_share_value = parseInt((increase_by*100)/current_Share_Value);
                var selected;

                console.log("CLUSTERING RESULT");
                console.log("Cluster 1 for words: ["+analysisResult.feature1Words+"] is of density="+analysisResult.clusters[0].length+" and sentimentScore="+analysisResult.feature1Sentiment);
                console.log("Cluster 2 for words: ["+analysisResult.feature2Words+"] is of density="+analysisResult.clusters[1].length+" and sentimentScore="+analysisResult.feature2Sentiment);
                if(analysisResult.clusters[1].length > analysisResult.clusters[0].length){
                  selected=2;
                }
                else{
                  selected=1;
                }
                if(selected==1){
                  var difference = analysisResult.feature1Sentiment - analysisResult.feature2Sentiment;
                  //analysisResult.score -> analysisResult.feature1Sentiment
                  //100                  -> ?
                  var rate = (100*analysisResult.feature1Sentiment)/analysisResult.score;
                  if(difference>0){
                    //Stock rate will increase
                    console.log("Stock will increase by "+rate);
                    
                  }
                  else{
                    //Stock rate will decrease
                    console.log("Stock will decrease by "+rate);
                    
                  }
                }
                else if(selected==2){
                  var difference = analysisResult.feature2Sentiment - analysisResult.feature1Sentiment;
                  //analysisResult.score -> analysisResult.feature2Sentiment
                  //100                  -> ?
                  var rate = (100*analysisResult.feature2Sentiment)/analysisResult.score;
                  if(difference>0){
                    //Stock rate will increase
                    console.log("Stock will increase by "+rate);
                    
                  }
                  else{
                    //Stock rate will decrease
                    console.log("Stock will decrease by "+rate);
                    
                  }
                }
                predict_share_value=avg*(100+rate)/100;
                console.log("Year 2012 Stock rate = "+comp1[0].Share_Values);
                console.log("Year 2013 Stock rate = "+comp1[1].Share_Values);
                console.log("Year 2014 Stock rate = "+comp1[2].Share_Values);
                console.log("AVG = "+avg);
                console.log("The new value of stock for year 2015 is "+predict_share_value);
                var shareValues=[];
                shareValues.push(comp1[0].Share_Values);
                shareValues.push(comp1[1].Share_Values);
                shareValues.push(comp1[2].Share_Values);
                shareValues.push(predict_share_value);
                
                //var clustersCopy = analysisResult.clusters;
                //var cluster1 = clustersCopy[0];
                //for(var i=0)

                /*
                var result = {
        score:          score,
        vsm:            vsm,
        feature1Words:  feature1Words,
        feature2Words:  feature2Words,
        feature1Sentiment:  feature1Sentiment,
        feature2Sentiment:  feature2Sentiment,
        VS:             VS,
        US:             US,
        clusters:       clusters
    };
                */
                
                res.render('viewStats', {
                    data: rows,
                    comp1: comp1,
                    comp2: comp2,
                    polarity: polarity,
                    tweets: tweets,
                    shareValues: shareValues,
                    feature1Words:  analysisResult.feature1Words,
                    feature2Words:  analysisResult.feature2Words,
                    feature1Sentiment:  analysisResult.feature1Sentiment,
                    feature2Sentiment:  analysisResult.feature2Sentiment,
                    clusters:       analysisResult.clusters
                });
            }
            // render or error

        });
        
    });


}



