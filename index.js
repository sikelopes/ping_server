/*!
 * =============================
 * ----- Sharing is caring -----
 * PLEASE RESPECT THE CODE OWNER
 * ---- 2021-12-04 16:58:26 ----
 * =============================
 * @package Ping Server
 * @copyright Noobscript
 * @author Sikelopes <sikelopes@gmail.com>
 * @version 1.0
 * @access Public
 */

const electron = require('electron');
const {app} = electron;
const path = require('path');
const fs = require('fs');
const cp = require('child_process');
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const monthZero = (month < 10 ? '0' + month : month);
const day = (today.getDate() < 10 ? '0' + today.getDate() : today.getDate());
const hour = (today.getHours() < 10 ? '0' + today.getHours() : today.getHours());
const minute = (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes());
const second = (today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds());
const datetime = year+""+monthZero+""+day+""+hour+""+minute+""+second;
const configFile = path.join(process.resourcesPath, 'config.json');

app.whenReady().then(() => {
    const config = getConfig();
    
    config.ips.forEach((data) => {
        let logFile = path.join(process.resourcesPath, 'logs', 'log_'+data+'_'+datetime+'.log');
        
        cp.exec('ping '+data+' -t >> '+logFile);
    });
    
    setTimeout(() => {
        app.quit();

        for (let x = 0; x < 10; x++) {
            cp.exec('taskkill /IM ping.exe /F');
        }
    }, config.duration);
});

function getConfig() {
	const jsonData = JSON.parse(fs.readFileSync(configFile));

    return jsonData;
}