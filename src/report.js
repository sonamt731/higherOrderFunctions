const nba = require('./nba.js');
//const hoffy = require('./hoffy.js'); not used 
const fs = require('fs');

const path = process.argv[2];
//console.log(path);

fs.readFile(path, 'utf8', function(err, data){
	if (err){
		console.log('No file found.');
	}
	else{

		const json = JSON.parse(data);
		//console.log(json);

		const resultSets = json['resultSets'];
		const playerStats = resultSets[0];
		const teamStats = resultSets[1];
		//const teamStarterStats = resultSets[2]; never used 


		const playerAsObj = rowsToObjects(playerStats);
		const teamAsObj = rowsToObjects(teamStats);

		//console.log(playerAsObj);

		//const cities = nba.getTeamCities(teamAsObj); never used 
		const totalPoints = pointTotal(teamAsObj);

		//output the total points
		console.log("* The score was: ",totalPoints);

		//output the best passer 
		const bestPasser = nba.bestPasser(playerAsObj);
		const playerName = bestPasser['PLAYER_NAME'];
		const assists = bestPasser['AST'];
		console.log("* The best passer was: " + playerName + " with "+ assists+" assists.");

		//output total rebounds
		const reboundTotals = nba.reboundTotals(teamAsObj);
		console.log("* The total rebounds per team were: ",reboundTotals);

		//best 3 point shooters
		console.log("* The best 3-point shooters were: ");
		const temp = get3PointShooters(playerAsObj);
		//console.log(temp);

		const firstPlayer = maxPercent(temp);

		console.log("1. " + firstPlayer['PLAYER_NAME']+": "+ firstPlayer['FG3_PCT']);

		const secondPlayer = maxPercent(temp);
		console.log("2. " + secondPlayer['PLAYER_NAME']+": "+ secondPlayer['FG3_PCT']);

		const thirdPlayer = maxPercent(temp);
		console.log("3. " + thirdPlayer['PLAYER_NAME']+": "+ thirdPlayer['FG3_PCT']);

	}
});

//changed function from hoffy file 
function rowsToObjects(data){
	const arr =[];
	const headers = data.headers;
	const rows = data.rowSet; //a 2D array --> we want the first list of rows 
	//first parameter is the value of the row and second parameter is the row #
	rows.map(function(val,row){
		const dict = {};
		//first parameter is the actual curr header and seocnd is col number
		headers.map(function(head, col){
			dict[head] = rows[row][col];
		});
		arr.push(dict);
	});

	return arr;
}

//gets the points - for the team
function getPoints(team, data){
	let points = 0;
	let i = 0;
	const withCity = data.map(player => player['TEAM_CITY'] === team);
	withCity.map(function(bool){
		if(bool === true){
			points+= data[i]['PTS'];
		}
		i++;
	});
	return points;
}

//These functions show up as errors in eslint but I wanted my functions at the bottom of my file
//calculate point total
function pointTotal(data){
	const teams = nba.getTeamCities(data);
	const pointList = teams.map(city => getPoints(city, data));
	//console.log(cities);
	//console.log(reboundList);
	const dict = {};
	teams.map(function(team, index){
			//if (!(city in dict)){
				dict[team]=pointList[index];
			//}
	});

	return dict;
}

//used to store the players that attempted a 3 point shooter
function get3PointShooters(data){
	const dictPercent3pt = [];
	let i = 0;
	//only gets the players with FGA3A > 1
	const players = data.map(player => player['FG3A']>1);
	//console.log(players);
	players.map(function(bool){
		const temp = {};
		if (bool === true){
			temp['PLAYER_NAME'] = data[i]['PLAYER_NAME'];
			temp['FG3_PCT'] = data[i]['FG3_PCT'];
			dictPercent3pt.push(temp);
		}
		i++;
	});
	return dictPercent3pt;

}

//used to get the maximum percent of players that shot a 3 point shooter
function maxPercent(playerDict){
	const result = playerDict.map(player => player['FG3_PCT']);

	const max = result.reduce(function(max, curr){
		return (curr > max) ? curr : max;
	});
	const index = result.indexOf(max);
	const top = playerDict[index];
	playerDict = playerDict.splice(index,1);
	//console.log(playerDict);

	return top;
}
