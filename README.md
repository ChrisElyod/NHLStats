# NHLStats

## This project is to be the culmination of my want to create a Toronto Maple Leafs Dashboard along with my knowledge of React and it's scalability.

## Background
I decided to make this tool due to wanting to make a better comparison tool than what is readily available on the internet. Most websites will let you see stats for each team
but will not let you compare one team to another and display which team is better in which category (players as well). Due to having invested time in 2018-19 to a fantasy
hockey league and participating again in this fantasy league, I wanted to build this tool.

### Data Acquisition
Data will be taken from the NHL API. This is a widely undocumented API that stores information on players/teams and can even be traced back to prior seasons. There are modifiers
on the base URLs that allow for more in depth stats and IDs linking teams to their information and players to their teams.

### Data Storage
PostgreSQL will be used as the data storage of choice. Having related fields being evident in the API data lends to the use of a relational database as storage/retrieval of information will be easy to manipulate.