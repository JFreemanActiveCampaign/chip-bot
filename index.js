

 Ziggy = require('./ziggy').Ziggy
    , ziggy = new Ziggy({
        server: 'irc.freenode.net'
        , nickname: 'chippah'
        , channels: ['#learnjavascript', '#danecando']
    })

ziggy.start()