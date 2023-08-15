import axios from 'axios';

// Define the API URL for all leagues
const apiUrl = `https://www.thesportsdb.com/api/v1/json/${process.env.API_KEY}/all_leagues.php`;

// Define the API URL for teams based on league name
const teamsApiUrl = `https://www.thesportsdb.com/api/v1/json/${process.env.API_KEY}/search_all_teams.php?l=`;

// Define the structure of the objects returned from the API
interface League {
  idLeague: string;
  strLeague: string;
  strSport: string;
}

interface Team {
  strTeamBadge: string;  // Team logo
  strTeam: string;       // Team name
}

// Fetch football leagues information from an API, filters and returns the first 5 American Football leagues
export async function fetchFootballLeagues() {
  try {
    const response = await axios.get(apiUrl);
    const allLeagues: League[] = response.data.leagues;

    // Filter out football leagues
    const footballLeagues = allLeagues.filter((league: League) => league.strSport === 'American Football');

    return footballLeagues.slice(0, 5);

  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

// Fetch teams information for a given league name from an API, returning an array of teams
export async function fetchTeamsForLeague(leagueName: string) {
  try {
    const teamsResponse = await axios.get(`${teamsApiUrl}${encodeURIComponent(leagueName)}`);
    const leagueTeams: Team[] = teamsResponse.data.teams;
    
    return leagueTeams;

  } catch (error) {
    console.error('Error fetching teams data:', error);
    return [];
  }
}
