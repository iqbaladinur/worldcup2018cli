const store = require('./data');
const mainView  = require('./../views/tableView'); 
const moment    = require('moment');

/* function getStadiums will render stadiums name and details. */
const getStadiums = () => {
    const tableConfig = {
        head: ['Stadium Name', 'City']
    };
    const stadiums = store.getData().stadiums;
    let content =  new Array();
    stadiums.map((list, index)=>{
        content.push([list.name, list.city]);
    })
    mainView.generateView(tableConfig, content,'STADIUMS LIST NAME');
}

/* function getTcChannels will render tv channels. */
const getTvChannels = () => {
    const tableConfig = {
        head: ['Channel Name', 'Country', 'Iso2', 'Language']
    };
    const tvChannels = store.getData().tvchannels;
    let content = new Array();
    tvChannels.map((list, index)=>{
        content.push([
            list.name,
            list.country,
            list.iso2,
            list.lang.toString()
        ]);
    });
    mainView.generateView(tableConfig, content, 'CHANNEL TV LIST');
}

/* function getTeams will render teams information. */
const getTeams = () => {
    const tableConfig = {
        head:['No', 'Country', 'FIFA Code'],
        colWidths: [4, 40, 30]
    };
    const teams = store.getData().teams;
    let content = new Array();
    teams.map((list, index)=>{
        content.push([
            index + 1,
            list.name,
            list.fifaCode
        ]);
    });
    mainView.generateView(tableConfig, content, 'WORLD CUP TEAMS');
}

/* function getGroupsMatch will render all group match information */
const getGroupsMatch = ()=>{
    /* groups match recap */
    const tableConfig = {
        head: ['Groups', 'Winner', 'Runner Up'],
    };
    const groups = Object.entries(store.getData().groups);
    let content = new Array();
    groups.map(([key, value])=>{
        content.push([
            value.name,
            store.getTeamName(value.winner)||'not yet',
            store.getTeamName(value.runnerup)||'not yet'
        ]);
    });
    mainView.generateView(tableConfig, content, 'GROUP MATCH RECAP');

    console.log('------------------------------------------------------------------');
    
    /* Round 16 */
    const tableConfigForRound16 = {
        head: ['Time', '', 'Runner Up'],
    }
    /* group matches detail */
    const tableConfigForMatch = {
        head: ['Time', 'Stadium', 'Home','Away', 'Match', 'Score'],
    };
    groups.forEach(([key, value]) => {
        let groupMatchs = new Array();
        value.matches.map((list)=>{
            groupMatchs.push([
                moment(list.date).calendar(),
                store.getStadiumName(list.stadium),
                store.getTeamName(list.home_team)||'error',
                store.getTeamName(list.away_team)||'error',
                'match '+list.name,
                list.home_result + ' : ' + list.away_result
            ]);
        });
        mainView.generateView(tableConfigForMatch, groupMatchs, 'GROUP '+ key.toUpperCase());
    });
}

/**
 * function getMatchByGroupName will render match information based on a group name
 * @param {string:a-h} groupName 
 */
const getMatchByGroupName = (groupName)=>{
    /* group matches detail */
    const tableConfigForMatch = {
        head: ['Time', 'Stadium', 'Home', 'Away', 'Match', 'Score'],
    };
    const groupData = store.getGroupDataByName(groupName);
    let groupMatchs = new Array();
    if (groupData) {
        groupData[1].matches.map((list) => {
            groupMatchs.push([
                moment(list.date).calendar(),
                store.getStadiumName(list.stadium),
                store.getTeamName(list.home_team) || 'error',
                store.getTeamName(list.away_team) || 'error',
                'match ' + list.name,
                list.home_result + ' : ' + list.away_result
            ]);
        });
        mainView.generateView(tableConfigForMatch, groupMatchs, 'GROUP ' + groupName.toUpperCase());
    }else{
        console.log("group doesn't exist.");
    }
}

const refreshData = ()=>{
    store.refreshData();
}


module.exports = {
    refreshData,
    getStadiums,
    getTvChannels,
    getTeams,
    getGroupsMatch,
    getMatchByGroupName
}