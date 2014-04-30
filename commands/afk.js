exports.names = ['.afk','.afkdjs'];
exports.hidden = true;
exports.enabled = true;
exports.matchStart = false;
exports.handler = function(data) {
    if (_.findWhere(room.users, {id: data.fromID}).permission > 1 && config.activeDJTimeoutMins > 0) {

        var maxIdleTime = config.activeDJTimeoutMins * 60;
        var idleDJs = [];
        var z = 0;

        waitlist = bot.getDJs().splice(1);
        waitlist.forEach(function(dj) {
            db.get("SELECT strftime('%s', 'now')-strftime('%s', lastActive) AS 'secondsSinceLastActive', strftime('%s', lastActive) AS 'lastActive', username FROM USERS WHERE userid = ?", [dj.id] , function (error, row) {
                z++;
                if (row != null) {
                    if(row.secondsSinceLastActive >= maxIdleTime) {
                        bot.log('[IDLE] ' + row.username + ' last active '+ timeSince(row.lastActive) + ' ago');
                        idleDJs.push(row.username + ' (' + timeSince(row.lastActive) + ')');
                    }
                    else {
                        bot.log('[ACTIVE] ' + row.username + ' last active '+ timeSince(row.lastActive) + ' ago');
                    }

                    if (z == waitlist.length) {
                        if(idleDJs.length > 0) {
                            var idleDJsList = idleDJs.join(', ');
                            bot.sendChat('Currently idle: ' + idleDJsList);
                        }
                        else {
                            bot.sendChat('Everyone\'s currently active! :thumbsup:');
                        }
                    }
                }
            });
        }

    }
};
