const fileSystem = require('fs');
const db = './store/db.json';
const http = require('axios');
const refreshData = ()=>{
    http.get('https://raw.githubusercontent.com/lsv/fifa-worldcup-2018/master/data.json')
        .then((res) => {
            fileSystem.writeFileSync(db, JSON.stringify(res.data), 'utf8');
            console.info('');
            console.info(" score is refrehed");
        })
        .catch((err) => {
            console.info(err.message);
        });
}

const getData = ()=>{
    return JSON.parse(fileSystem.readFileSync(db, 'utf8'));
}

const getTeamById = (id)=>{
    const data = getData().teams;
    return data.find(item => item.id == id);
}

const getTeamName = (id)=>{
    const team = getTeamById(id);
    if (team) {
        return team.fifaCode;
    }else{
        return null;
    }
}

const getChannelById = (id)=>{
    const data = getData().tvchannels;
    return data.find(item => item.id == id);
}

const getStadiumById = (id)=>{
    const data = getData().stadiums;
    return data.find(item => item.id == id);
}

const getStadiumName = (id)=>{
    const stadium = getStadiumById(id);
    if (stadium) {
        return stadium.name;
    } else {
        return null;
    }
}

const getGroupDataByName = (name) =>{
    const groups = Object.entries(getData().groups);
    return groups.find(([key, value])=> key == name);
}
module.exports = {
    refreshData, 
    getData, 
    getTeamById,
    getTeamName, 
    getChannelById, 
    getStadiumById,
    getStadiumName,
    getGroupDataByName
}