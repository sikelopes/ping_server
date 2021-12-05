/*!
 * =============================
 * ----- Sharing is caring -----
 * PLEASE RESPECT THE CODE OWNER
 * ---- 2021-12-04 16:58:21 ----
 * =============================
 * @package Ping Server
 * @copyright Noobscript
 * @author Sikelopes <sikelopes@gmail.com>
 * @version 1.0
 * @access Public
 */

'use strict';
const packager = require('electron-packager');
const path = require('path');
const {exec} = require("child_process");
const jsonData = path.join(__dirname, 'node_modules/electron/dist/resources/config.json');
const dirLog = path.join(__dirname, 'node_modules/electron/dist/resources/logs');

exec("md empty && robocopy empty releases /purge && robocopy empty releases /purge && robocopy empty releases /purge  && robocopy empty releases /purge  && robocopy empty releases /purge  && robocopy empty releases /purge  && robocopy empty releases /purge && rd releases /s /q && rd empty /s /q", (err, stdout, stderr) => {
    if (err) {
        console.log(err);
    }
    
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
});

packager({
    'arch': 'ia32',
    'platform': 'win32',
    'dir': './',
    'app-copyright': 'Noobscript',
    'app-version': '1.0.0',
    'name': 'server-ping',
    'out': './releases',
    'asar': true,
    'prune': true,
    'overwrite': true,
    'version': '1.0.0',
    "ignore": "^\.svn|^\.vscode",
    "extraResource": [
        jsonData,
        dirLog
    ],
    'version-string': {
        'CompanyName': 'Noobscript',
        'FileDescription': 'server-ping v1.0.0',
        'OriginalFilename': 'server-ping',
        'ProductName': 'server-ping v1.0.0',
        'InternalName': 'server-ping'
    }
}, function done_callback(err, appPaths) {
    console.log("Error: ", err);
    console.log("appPaths: ", appPaths);
});