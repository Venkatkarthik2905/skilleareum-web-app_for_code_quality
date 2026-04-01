const express = require('express');
const cors = require('cors');
const https = require('https');
const app = express();
const { executeQuery } = require('./Db');
const PORT = 4000;
const RAPIDAPI_KEY = '6b91fdd7c0msh1947fbce4f9dfb7p1a2212jsn84034fc046f1';

app.use(cors());


app.get('/api/followers', async(req, res) => {
  const options = {
    method: 'GET',
    hostname: 'twitter-api47.p.rapidapi.com',
    port: null,
    path: '/v2/user/followers?userId=1801124796996153344', 
    headers: {
      'x-rapidapi-key': RAPIDAPI_KEY,
      'x-rapidapi-host': 'twitter-api47.p.rapidapi.com'
    }
  };

  const reqFollowers = https.request(options, function (resFollowers) {
    const chunks = [];

    resFollowers.on('data', function (chunk) {
      chunks.push(chunk);
    });

    resFollowers.on('end', async function () {
      const body = Buffer.concat(chunks);
      const responseBody = JSON.parse(body.toString());

      if (responseBody.users && Array.isArray(responseBody.users)) {
        const followerDisplayNames = responseBody.users.map(user => user.legacy.name);
        console.log("Followers' Display Names:");
        console.log(followerDisplayNames);

        try {
          const updatePromises = followerDisplayNames.map(element => {
            const updateQuery = "UPDATE users_data SET token_balance = ? WHERE twitter_name = ?";
            return executeQuery(updateQuery, [50, element]);
          });

          await Promise.all(updatePromises);

          res.json({ followerDisplayNames });
        } catch (error) {
          console.error('Error updating database:', error);
          res.status(500).json({ error: 'Failed to update database' });
        }
      } else {
        res.status(500).json({ error: 'Unexpected response structure', responseBody });
        console.error('Unexpected response structure:', responseBody);
      }
    });
  });

  reqFollowers.on('error', function (error) {
    console.error('Error fetching followers:', error.message);
    res.status(500).json({ error: 'Failed to fetch followers' });
  });

  reqFollowers.end();
});


app.get('/api/retweets', (req, res) => {
  const options = {
    method: 'GET',
    hostname: 'twitter-api47.p.rapidapi.com',
    port: null,
    path: '/v2/tweet/retweets?tweetId=1813452610889781467', 
    headers: {
      'x-rapidapi-key': RAPIDAPI_KEY,
      'x-rapidapi-host': 'twitter-api47.p.rapidapi.com'
    }
  };

  const reqRetweets = https.request(options, function (resRetweets) {
    const chunks = [];

    resRetweets.on('data', function (chunk) {
      chunks.push(chunk);
    });

    resRetweets.on('end', function () {
      const body = Buffer.concat(chunks);
      res.json(JSON.parse(body.toString()));
      console.log("retweets");
      console.log(body.toString());
    });
  });

  reqRetweets.on('error', function (error) {
    console.error('Error fetching retweets:', error.message);
    res.status(500).json({ error: 'Failed to fetch retweets' });
  });

  reqRetweets.end();
});


app.get('/api/likes', (req, res) => {
  const options = {
    method: 'GET',
    hostname: 'twitter-api47.p.rapidapi.com',
    port: null,
    path: '/v2/tweet/likes?tweetId=1813452610889781467', 
    headers: {
      'x-rapidapi-key': RAPIDAPI_KEY,
      'x-rapidapi-host': 'twitter-api47.p.rapidapi.com'
    }
  };

  const reqLikes = https.request(options, function (resLikes) {
    const chunks = [];

    resLikes.on('data', function (chunk) {
      chunks.push(chunk);
    });

    resLikes.on('end', function () {
      const body = Buffer.concat(chunks);
      res.json(JSON.parse(body.toString()));
      console.log("likes");
      console.log(body.toString());
    });
  });

  reqLikes.on('error', function (error) {
    console.error('Error fetching likes:', error.message);
    res.status(500).json({ error: 'Failed to fetch likes' });
  });

  reqLikes.end();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});