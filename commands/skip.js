exports.names = ['.skip'];
exports.hidden = true;
exports.enabled = true;
exports.matchStart = false;
exports.handler = function(data) {
    console.log('[SKIP] ' + data.fromID + ':' + room.djs[0].user.id);
    if (room.staff[data.fromID] > 1 || data.fromID == room.djs[0].user.id) {
        bot.moderateForceSkip();
    }
};
