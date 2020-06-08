const { ipcRenderer } = require('electron');

var cadastrados = [{name: "Youtube Principal", host: "a.rtmp.youtube.com"},{name: "Youtube Backup", host: "b.rtmp.youtube.com"},{name: "DNS Google", host: "8.8.8.8"},{name: "DNS Cloudflare", host: "1.1.1.1"}];

var hosts = ['192.168.0.1', 'google.com', 'yahoo.com'];

setInterval(enviaHosts,15000,cadastrados);

function enviaHosts(hosts){
    ipcRenderer.send('request-info-hosts', hosts);
    console.log("Solicitado info sobres hosts: ",hosts);
}

ipcRenderer.on('newDados',(event,arg)=>{
    console.log(arg);
})