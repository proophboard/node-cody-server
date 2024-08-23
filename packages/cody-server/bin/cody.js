#!/usr/bin/env node

const cli = require('commander');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

// this is the directory the users project is in
const projectDIR = process.cwd();
const coreDirectory = path.join(__dirname, '../');
const srcDirectory = path.join(__dirname, '../src');

cli
    .command('start')
    .description('Start the Cody server.')
    .action(() => {
        execSync(`npx ts-node ${srcDirectory}/index.ts`, {
            cwd: projectDIR,
            stdio: 'inherit',
        });
    });

cli
    .command('init')
    .description('Initialize cody config')
    .action(() => {
        if(fs.existsSync(projectDIR + '/codyconfig.ts')) {
            console.warn('A codyconfig.ts file exists already in the project root. Init is not needed!');
            process.exit(0);
            return;
        }

        fs.cpSync(coreDirectory + '/codyconfig.ts', projectDIR + '/codyconfig.ts');

        console.log('Created a fresh codyconfig.ts in project root. Configure your hooks in that file to be invoked by Cody.')
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
