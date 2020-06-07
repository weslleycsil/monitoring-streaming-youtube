var ping = require('jjg-ping');

var hosts = ['192.168.0.1', 'google.com', 'yahoo.com'];
hosts.forEach(function(host){
    ping.system.ping(host, function(latency, status) {
        if (status) {
            // Host is reachable/up. Latency should have a value.
            console.log(host + ' is reachable (' + latency + ' ms ping).');
        }
        else {
            // Host is down. Latency should be 0.
            console.log(host + ' is unreachable.');
        }
    });

})

