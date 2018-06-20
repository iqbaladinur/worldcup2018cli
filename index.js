#!/usr/bin/env node
const program   = require('commander');
const models    = require('./models/manage');

program
    .version('1.0.0')
    .description('World CUP 2018 Russia');

program
    .command('refresh')
    .alias('r')
    .description('Get newest data from server.')
    .action(() => {
        models.refreshData();          
    });

program
    .command('stadium')
    .alias('s')
    .description('Get Stadium information.')
    .action(() => {
        models.getStadiums();
    });

program
    .command('channels')
    .alias('c')
    .description('Get TV channels information.')
    .action(() => {
        models.getTvChannels();
    });

program
    .command('teams')
    .alias('t')
    .description('Get participant country information.')
    .action(() => {
        models.getTeams();
    });

program
    .command('matches')
    .alias('m')
    .description('Get match details')
    .action(() => {
        models.getGroupsMatch();
    });

program
    .command('groupMatch <name>')
    .alias('gm')
    .description('Get match details a group')
    .action((name) => {
        models.getMatchByGroupName(name);
    });

program.parse(process.argv);