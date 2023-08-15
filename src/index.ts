import './style.scss';
import { fetchTeamsForLeague, fetchFootballLeagues } from './api';

// Get the tab container & teams container 
const tabContainer = document.querySelector('.tab-container');
const teamsContainer = document.querySelector('.teams-container');

/*
Populates tab buttons with the names of football leagues
Upon clicking a tab button, dynamically fetches and displays the teams for the selected league in the DOM
*/
async function populateTabButtons() {

  const footballLeagues = await fetchFootballLeagues();

  // Populate the tab buttons with league names
  footballLeagues.forEach((league) => {
    const tabButton = document.createElement('button');
    tabButton.classList.add('tab-button');
    tabButton.textContent = league.strLeague;
    tabContainer.appendChild(tabButton);

     // Add click event listener to the tab button
    tabButton.addEventListener('click', async () => {
      const leagueTeams = await fetchTeamsForLeague(league.strLeague);

      // Clear previous team data
      teamsContainer.innerHTML = '';

      // The user need to know which league he pressed
      const whichLeagueSelected = document.createElement('span');
      whichLeagueSelected.classList.add('which-league-selected-message');
      whichLeagueSelected.textContent = `This is the teams in "${league.strLeague}":`;
      teamsContainer.appendChild(whichLeagueSelected);

      // Create teams list for the selected league
      leagueTeams.forEach((team) => {
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
    });
  });
}

populateTabButtons();
