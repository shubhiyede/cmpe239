/**
 * Created by shubhiyede on 17/11/2015.
 */
var mysql = require('./mysql');
var tweetStats = require('./twitterSearch');

exports.getStats = function (req, res) {

    var compFirst = req.param("comp1").toLowerCase().trim();
    var criteria = "stock";//"stock equity asset liability revenue EBITDA profit loss cash up down";
    var compSecond = req.param("comp2").toLowerCase().trim();
    var getStats = "select * from mytable1 where Company_Name='" + compFirst + "' OR Company_Name='" + compSecond + "'";
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
            if (rows.length < 6) {

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
                
                
                /*
                var result = {
                  score:          score,          
                  vsm:            vsm,
                  feature1Words:  feature1Words,  //X-axis f1(w1,w4,w7)
                  feature2Words:  feature2Words,  //Y-axis f2(w1,w2,w3)
                  VS:             VS,
                  US:             US,
                  clusters:       clusters        
                  //clusters[0] - red array of (x,y)  -ve <X< +ve
                  //clusters[1] - green array of (x,y) -ve <Y< +ve
                };
                */
                
                res.render('viewStats', {
                    data: rows,
                    comp1: comp1,
                    comp2: comp2,
                    polarity: polarity,
                    tweets: tweets,
                    finalPercent: predict_share_value
                });
            }
            // render or error

        });
        
    });


}



