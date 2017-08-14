// Import friends data.
var friendData = require('../data/friends.js');

module.exports = function(app) {

    // GET route from friends
    app.get('/api/friends', function(req, res) {
        res.json(friendData);
    });

    // POST route for /api/friends takes new data and responds with the best match
    app.post('/api/friends', function(req, res) {
        // Our user is the data sent in the request.
        var thisUser = req.body;
        var differences = [];

        // If there is more than one friend to compare to,
        if (friendData.length > 1) {
            // Step through these potential friends.
            friendData.forEach(function(user) {
                var totalDifference = 0;

                // compare answers and add differences
                for (var i = 0; i < thisUser.answers.length; i++) {
                    var otherAnswer = user.answers[i];
                    var thisAnswer = thisUser.answers[i];
                    var difference = +otherAnswer - +thisAnswer;
                    totalDifference += Math.abs(difference);
                }

                differences.push(totalDifference);
            });

            // Find the lowest score
            var minimumDifference = Math.min.apply(null, differences);

            // make an array for the best matches
            var bestMatches = [];

            
            // if trhe difference is equal to minimumDifference then add the matching friendData to the bestMatches array.
            for (var i = 0; i < differences.length; i++) {
                if (differences[i] === minimumDifference) {
                    bestMatches.push(friendData[i]);
                }
            }

            // Send the  bestMatches to the client.
            res.json(bestMatches);
        // If there is only one friend to compare to, skip all that work and just send back that friend.
        } else {
            res.json(friendData);
        }

        // Once you're done comparing, add the new user to the potential friends data.
        friendData.push(thisUser);

    });
};