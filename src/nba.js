// nba.js
/*
Sonam Tailor 
Homework #2

Note that each of these functions takes the parameter, data, that is in the format of an Array of objects
With each object representing player data for a game
*/

function bestPasser(data){
//use filter or reduce 
//store the player with the highest AST val and return 
	const result = data.map(player => player['AST']);

	const max = result.reduce(function(max, curr){
		return (curr > max) ? curr : max;
	});

	const index = result.indexOf(max);

	return data[index];
}

function getTeamCities(data){
	const cities = data.map(player => player['TEAM_CITY']);

	const uniqueCities = cities.filter(function(city, index){
		return cities.indexOf(city)>=index;
	});

	return uniqueCities;

}

function teamRebounds(city, data){
	let RebTotal = 0;
	let i = 0;
	const withCity = data.map(player => player['TEAM_CITY'] === city);
	withCity.map(function(bool){
		if(bool === true){
			RebTotal+=data[i]['REB'];
		}
		i++;
	});
	return RebTotal;

}

function reboundTotals(data){
	const cities = getTeamCities(data);
	const reboundList = cities.map(city => teamRebounds(city, data));
	//console.log(cities);
	//console.log(reboundList);
	const dict = {};
	cities.map(function(city, index){
			//if (!(city in dict)){
				dict[city]=reboundList[index];
			//}
	});

	return dict;
}




module.exports = {
	bestPasser: bestPasser,
	getTeamCities: getTeamCities,
	teamRebounds: teamRebounds, 
	reboundTotals: reboundTotals,




};


// const data = [ 
//   {"TEAM_CITY": "Brooklyn", "PLAYER_NAME": "Spencer Dinwiddie", "FG3_PCT": 0.25, "FG3_A": .34, "REB": 3, "AST":45, "PTS": 67}, // more properties included
//   {"TEAM_CITY": "Brooklyn", "PLAYER_NAME": "Joe Harris", "FG3_PCT": 0.75, "FG3_A": .84, "REB": 9, "AST":65, "PTS": 69}, // more properties
//   {"TEAM_CITY": "Atlanta", "PLAYER_NAME": "Trae Young", "FG3_PCT": 0.67, "FG3_A": .24, "REB": 4, "AST":75, "PTS": 98} // more properties
//   // more object after this
// ];

//console.log(bestPasser(data));
//console.log(getTeamCities(data));
// console.log(teamRebounds('Brooklyn',data));
// console.log(reboundTotals(data));

