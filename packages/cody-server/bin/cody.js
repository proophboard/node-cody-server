#!/usr/bin/env node

const cli = require('commander');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

// this is the directory the users project is in
const projectDIR = process.cwd();
const coreDirectory = path.join(__dirname, '../');
const libDirectory = path.join(__dirname, '../lib');

cli
    .command('start')
    .description('Start the Cody server.')
    .action(() => {
        execSync(`node ${libDirectory}/index.js`, {
            cwd: projectDIR,
            stdio: 'inherit',
        });
    });

cli
    .command('init')
    .description('Initialize cody config')
    .action(() => {
        if(fs.existsSync(projectDIR + '/codyconfig.js')) {
            console.warn('A codyconfig.js file exists already in the project root. Init is not needed!');
            process.exit(0);
            return;
        }

        fs.cpSync(coreDirectory + '/codyconfig.js', projectDIR + '/codyconfig.js');

        console.log('Created a fresh codyconfig.js in project root. Configure your hooks in that file to be invoked by Cody.')
        console.log('Learn more about Cody: https://wiki.prooph-board.com/cody/Cody-Server.html')

        process.exit(0);
    })

async function run() {
    cli.parse(process.argv);

    if (!process.argv.slice(2).length) {
        cli.outputHelp();
    }
}

run();

process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
});
