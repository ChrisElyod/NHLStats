export function getStatName(value) {
  switch (value) {
    case 'GAMESPLAYED':
      return 'Games Played';
    case 'WINS':
      return 'Wins';
    case 'LOSSES':
      return 'Losses';
    case 'OT':
      return 'OT Losses';
    case 'PTS':
      return 'Points';
    case 'PTPCTG':
      return 'Point %';
    case 'GOALSPERGAME':
      return 'Goals/game';
    case 'GOALSAGAINSTPERGAME':
      return 'Goals Against/game';
    case 'EVGGARATIO':
      return 'evgGA Ratio';
    case 'POWERPLAYPERCENTAGE':
      return 'Power Play %';
    case 'POWERPLAYGOALS':
      return 'PPGs';
    case 'POWERPLAYGOALSAGAINST':
      return 'PPG Against';
    case 'POWERPLAYOPPORTUNITIES':
      return 'Power Plays';
    case 'PENALTYKILLPERCENTAGE':
      return 'Penalty Kill %';
    case 'SHOTSPERGAME':
      return 'Shots/game';
    case 'SHOTSALLOWED':
      return 'Shots Allowed/game';
    case 'WINSCOREFIRST':
      return 'Win when Score First';
    case 'WINOPPSCOREFIRST':
      return 'Win Opp Score First';
    case 'WINLEADFIRSTPER':
      return 'First Per Lead Conversion';
    case 'WINLEADSECONDPER':
      return 'Second Per Lead Conversion';
    case 'WINOUTSHOOTOPP':
      return 'Outshoot Opp Win %';
    case 'WINOUTSHOTBYOPP':
      return 'Outshot by Opp Win %';
    case 'FACEOFFSTAKEN':
      return 'Faceoffs Taken';
    case 'FACEOFFSWON':
      return 'Faceoffs Won';
    case 'FACEOFFSLOST':
      return 'Faceoffs Lost';
    case 'FACEOFFWINPERCENTAGE':
      return 'Faceoff Win %';
    case 'SHOOTINGPCTG':
      return 'Shooting %';
    case 'SAVEPCTG':
      return 'Save %';
    default:
      return;
  }
}
