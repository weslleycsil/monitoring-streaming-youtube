var ping = require('jjg-ping');

function reqDados(hosts){
    var results = [];

    hosts.forEach(function(host){
        results.push(pingPromisse(host.host));
    })
    return results;
}

function pingPromisse(host){
    return new Promise((resolve,reject)=>{
        ping.system.ping(host, function(latency, status) {
            let result = {};
            if (status) {
                // Host is reachable/up. Latency should have a value.
                result.host = host;
                result.latencia = latency;
                result.status = status;
                resolve(result);
                //console.log(host + ' is reachable (' + latency + ' ms ping).');
            } 
            else {
                // Host is down. Latency should be 0.
                result.host = host;
                result.latencia = 0;
                result.status = status;
                resolve(result);
                //console.log(host + ' is unreachable.');
            }
        });
    })
}

module.exports = reqDados;
