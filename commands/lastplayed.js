exports.names = ['lastplayed'];
exports.hidden = false;
exports.enabled = true;
exports.matchStart = true;
exports.handler = function (data) {

    var params = _.rest(data.message.split(' '), 1);
    var message = '';
    var songid = bot.getMedia().id;

    if (params.length > 0) {
        songid = params.join(' ').trim();
    }

    models.Play.findOne({
        include: [{model: models.Song, where: {$or: [{site_id: songid}, {host_id: songid}]}}, models.User],
        order: [['created_at', 'DESC']]
    }).then(function (row) {
        if (!row && params.length == 0) {
            bot.sendChat('This is the first time I have seen this song played in this room!');
        } else if (!row) {
            bot.sendChat('I have not seen a song with id `' + songid + '` played in this room!');
        } else {
            message = row.Song.name + ' • last played ' + timeSince(row.created_at) + ' by ' + row.User.username
                + ' • ' + row.listeners + ' listeners • ' + (row.positive - row.negative) + ' dubs';
            bot.sendChat(message);
        }
    });
};