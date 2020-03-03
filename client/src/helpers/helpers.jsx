import { getStatName } from './StatNameHelper';

export const formatDate = date => {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

export const getTeamLogo = teamName => {
  switch (teamName) {
    case 'Leafs':
      return 'https://content.sportslogos.net/logos/1/28/thumbs/2887612017.gif';
    case 'Panthers':
      return 'https://content.sportslogos.net/logos/1/13/thumbs/1380782017.gif';
    case 'Hurricanes':
      return 'https://content.sportslogos.net/logos/1/6/thumbs/fotih31tn5r345nufo5xxayh3.gif';
    case 'Coyotes':
      return 'https://content.sportslogos.net/logos/1/5263/thumbs/526378072015.gif';
    case 'Bruins':
      return 'https://content.sportslogos.net/logos/1/3/thumbs/venf9fmhgnsawnxxvehf.gif';
    case 'Sabres':
      return 'https://content.sportslogos.net/logos/1/4/thumbs/i40oxcdbo7xtfamqqhqachoyo.gif';
    case 'Ducks':
      return 'https://content.sportslogos.net/logos/1/1736/thumbs/173616512014.gif';
    case 'Flames':
      return 'https://content.sportslogos.net/logos/1/5/thumbs/50.gif';
    case 'Blackhawks':
      return 'https://content.sportslogos.net/logos/1/7/thumbs/56.gif';
    case 'Avalanche':
      return 'https://content.sportslogos.net/logos/1/8/thumbs/64.gif';
    case 'Jackets':
      return 'https://content.sportslogos.net/logos/1/9/thumbs/jhepegs329pc7ugyypebl28wg.gif';
    case 'Stars':
      return 'https://content.sportslogos.net/logos/1/10/thumbs/1079172014.gif';
    case 'Wings':
      return 'https://content.sportslogos.net/logos/1/11/thumbs/yo3wysbjtagzmwj37tb11u0fh.gif';
    case 'Oilers':
      return 'https://content.sportslogos.net/logos/1/12/thumbs/1227282018.gif';
    case 'Kings':
      return 'https://content.sportslogos.net/logos/1/14/thumbs/1422202020.gif';
    case 'Wild':
      return 'https://content.sportslogos.net/logos/1/15/thumbs/1588102014.gif';
    case 'Canadiens':
      return 'https://content.sportslogos.net/logos/1/16/thumbs/124.gif';
    case 'Predators':
      return 'https://content.sportslogos.net/logos/1/17/thumbs/lvchw3qfsun2e7oc02kh2zxb6.gif';
    case 'Devils':
      return 'https://content.sportslogos.net/logos/1/18/thumbs/32tfs723a3bes0p0hb4hgcy1u.gif';
    case 'Islanders':
      return 'https://content.sportslogos.net/logos/1/19/thumbs/1939112018.gif';
    case 'Rangers':
      return 'https://content.sportslogos.net/logos/1/20/thumbs/144.gif';
    case 'Senators':
      return 'https://content.sportslogos.net/logos/1/21/thumbs/2bkf2l3xyxi5p0cavbj8.gif';
    case 'Flyers':
      return 'https://content.sportslogos.net/logos/1/22/thumbs/161.gif';
    case 'Penguins':
      return 'https://content.sportslogos.net/logos/1/24/thumbs/2463622017.gif';
    case 'Sharks':
      return 'https://content.sportslogos.net/logos/1/26/thumbs/dmo1xf3z4pph27vmg3gf.gif';
    case 'Blues':
      return 'https://content.sportslogos.net/logos/1/25/thumbs/187.gif';
    case 'Lightning':
      return 'https://content.sportslogos.net/logos/1/27/thumbs/97hhvk8e5if0riesnex30etgz.gif';
    case 'Canucks':
      return 'https://content.sportslogos.net/logos/1/29/thumbs/2920842020.gif';
    case 'Knights':
      return 'https://content.sportslogos.net/logos/1/6114/thumbs/611426842018.gif';
    case 'Capitals':
      return 'https://content.sportslogos.net/logos/1/30/thumbs/llrs2zxi127vkqgcsvfb.gif';
    case 'Jets':
      return 'https://content.sportslogos.net/logos/1/3050/thumbs/z9qyy9xqoxfjn0njxgzoy2rwk.gif';
    default:
      return 'https://content.sportslogos.net/leagues/thumbs/1.gif';
  }
};
export const formatTeamStats = (teamStats, teamStatsRank) => {
  const teamItems = [];
  Object.keys(teamStats.data.teamStats).forEach(key => {
    if (!(key === '__typename')) {
      switch (key) {
        case 'savePctg':
          teamItems.push({
            header: getStatName(key.toUpperCase()),
            description: teamStats.data.teamStats[key],
            meta: teamStatsRank.data.teamStatsRank['savePctRank'],
          });
          break;
        case 'shootingPctg':
          teamItems.push({
            header: getStatName(key.toUpperCase()),
            description: teamStats.data.teamStats[key],
            meta: teamStatsRank.data.teamStatsRank['shootingPctRank'],
          });
          break;
        case 'gamesPlayed':
          teamItems.push({
            header: getStatName(key.toUpperCase()),
            description: teamStats.data.teamStats[key],
            meta: 'N/A',
          });
          break;
        default:
          teamItems.push({
            header: getStatName(key.toUpperCase()),
            description: teamStats.data.teamStats[key],
            meta: teamStatsRank.data.teamStatsRank[key],
          });
      }
    }
  });
  return teamItems;
};
