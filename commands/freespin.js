exports.names = ['freespin'];
exports.hidden = true;
exports.enabled = true;
exports.matchStart = false;
exports.handler = function (data) {
    bot.sendChat(config.responses.freeSpin);
};