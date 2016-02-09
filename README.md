nipbot
==========

nipbot is a fork of https://github.com/avatarkava/beavisbot-dubtrack-fm

This bot uses https://github.com/anjanms/DubAPI as its API dependency and is designed to be run using a node.JS instance.

Quick Installation
-----------------------

1. Run `npm install` in the root folder of the checkout
2. Copy the config.sample.json from /install to the root folder and rename it config.json
3. Edit config.json to suit your needs
4a. If you are using MySQL, run the install/tables.sql file against the database to create all the necessary tables
4b. If you are using SQLite, copy the supplied sample.sqlite to the root folder and rename it to align with your settings in config.json

Known issues are located at https://github.com/mreinhardt/nipbot/issues - please submit any bug reports or feature requests there!

Logging and Log Rotation
------------------------

Full details are here: https://github.com/Unitech/pm2

Start the process in pm2 with custom log locations:

```
pm2 start /srv/web/apps/dubtrack.fm/nipbot/bot.js --name nipbot -o /var/log/node/nipbot.log -e /var/log/node/nipbot.err --log-date-format 'YYYY-MM-DD HH:mm:ss'
```

Set pm2 to automatically run on startup

```
pm2 startup <ubuntu|centos|gentoo|systemd>
```

Save the processes running so they get restored any time pm2 is started

```
pm2 save
```

Then in /etc/logrotate.d, create a file (name it whatever you like, "node" works well here) and use
this or something along these lines as the contents:

```
/var/log/node/* {
    daily
    rotate 30
    missingok
    notifempty
    sharedscripts
    copytruncate
    compress
    delaycompress
    dateext
}
```

This will do a daily rotation of the logs and save the last 30 days.

