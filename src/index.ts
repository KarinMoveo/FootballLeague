import './style.scss';
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

// Fetching all
async function fetchFootballLeagues() {
  try {
    const response = await axios.get(apiUrl);
    const allLeagues = response.data.leagues;

    // Filter out football leagues
    const footballLeagues = allLeagues.filter((league: League) => league.strSport === 'American Football');

    // Get the tab container
    const tabContainer = document.querySelector('.tab-container');

    // Populate the tab buttons with league names
    footballLeagues.slice(0, 5).forEach((league: League) => {
      const tabButton = document.createElement('button');
      tabButton.classList.add('tab-button');
      tabButton.dataset.leagueName = league.strLeague; // Use league name as data attribute
      tabButton.textContent = league.strLeague;
      tabContainer.appendChild(tabButton);

      // Add click event listener to the tab button
      tabButton.addEventListener('click', async () => {
        try {
          // Fetch teams for the selected league using league name
          const teamsResponse = await axios.get(`${teamsApiUrl}${encodeURIComponent(league.strLeague)}`);
          const leagueTeams: Team[] = teamsResponse.data.teams;
    
          // Get the teams container
          const teamsContainer = document.querySelector('.teams-container');
          const whichLeagueSelected = document.createElement('span');
          whichLeagueSelected.classList.add('which-league-selected-message');

          // Clear previous team data
          teamsContainer.innerHTML = '';

          whichLeagueSelected.textContent = `This is the teams in ${league.strLeague} league:`;
          teamsContainer.appendChild(whichLeagueSelected);

          // Create teams list for the selected league
          leagueTeams.forEach((team: Team) => {
            const teamContainer = document.createElement('div');
            teamContainer.classList.add('team');

            const teamLogo = document.createElement('img');
            teamLogo.src = team.strTeamBadge;
            teamLogo.alt = `${team.strTeam} Logo`;

            const teamName = document.createElement('span');
            teamName.textContent = team.strTeam;

            teamContainer.appendChild(teamLogo);
            teamContainer.appendChild(teamName);
            teamsContainer.appendChild(teamContainer);

        

          });
        } catch (error) {
          console.error('Error fetching teams data:', error);
        }
      });
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchFootballLeagues();
