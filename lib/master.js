var master = function(name) {

    var isOnline = false;

    return {

        getStatus: function() {
            return isOnline;
        },
        setStatus: function(status) {
            isOnline = status;
        }

    }
}

module.exports = master;