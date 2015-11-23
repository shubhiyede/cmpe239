# Company_Stocks_Prediction
CMPE 239: Web &amp; Data Mining

##Project Statement:

1. System to predict future company stocks.
2. The algorithm uses past 3 years of financial records of the companies and Data about the company and its stock from Twitter.
3. It determines the approximate rate of stock for current year.
4. To make prediction following Data Mining Techniques were applied:
    1. Representation of tweets in Vector Space Model
    2. TF-IDF weights of Relevant words
    3. Cosine Similarity between any pair of tweets
    4. Latent Symantic Analysis of Tweets usin Single Value Decomposition
    5. k-means Clustering for tweet points to find stock rates of company.
5. End Users: Market Analysts, Investors.

##Technology Stack:
1. NodeJS-ExpressJS
2. MySQL
3. BootStrap
4. npm-svd
5. npm-twit
6. npm-clusterfck
7. HighCharts

##Steps to run the Project:
1. Install NodeJS-MySQL (Import MySQL script to populate your DB with mock data + Configure Node/MySQL settings).
2. Navigate to bin folder.
3. Type "node www" on your command prompt/terminal.
4. Hit "http://localhost:3000"

##Project Screenshots:

-> Homepage:

![alt tag](https://github.com/Chhavi1991Gupta/DataCrunchers/blob/master/Screenshots/Screen%20Shot%202015-11-20%20at%203.24.40%20PM.png)

-> Analyze a company stock [ Microsoft (MSFT) & Nokia (NOK) ]:

![alt tag](https://github.com/Chhavi1991Gupta/DataCrunchers/blob/master/Screenshots/Screen%20Shot%202015-11-20%20at%203.24.46%20PM.png)

-> Visualize Stats:

![alt tag](https://github.com/Chhavi1991Gupta/DataCrunchers/blob/master/Screenshots/Screen%20Shot%202015-11-20%20at%203.24.54%20PM.png)

-> Sentiment Analysis:

![alt tag](https://github.com/Chhavi1991Gupta/DataCrunchers/blob/master/Screenshots/Screen%20Shot%202015-11-20%20at%203.38.27%20PM.png)

-> Prediction Results:

![alt tag](https://github.com/Chhavi1991Gupta/DataCrunchers/blob/master/Screenshots/Screen%20Shot%202015-11-20%20at%203.38.45%20PM.png)
