function splitPublicTraffic() {
    var myip = myIpAddress();
    var ipbytes = myip.split(".");
    var lastoctet = parseInt(ipbytes[3], 10);

    switch (lastoctet % 2) {
    case 0:
        return "PROXY 172.16.0.222:9090; PROXY 172.16.0.23:8443; DIRECT";
    case 1:
        return "PROXY 172.16.0.222:9200; PROXY 172.16.0.23:8888; DIRECT";

    }
}


function FindProxyForURL(url, host) {
            var privateIP = /^(0|10|127|192\.168|172\.1[6789]|172\.2[0-9]|172\.3[01]|169\.254|192\.88\.99)\.[0-9.]+$/;
            var resolved_ip = dnsResolve(host);

          
            if (isPlainHostName(host) || isInNet(resolved_ip, "192.0.2.0","255.255.255.0") || privateIP.test(resolved_ip))
                return "DIRECT";

           
            if (url.substring(0,4) == "ftp:")
                return "DIRECT";
            
   
    if (isInNet(resolved_ip, "100.64.0.0","255.255.0.0"))
        return "DIRECT";
            
           
            if (((localHostOrDomainIs(host, "trust.zscaler.com")) ||
                    (localHostOrDomainIs(host, "trust.zscaler.net")) ||
                    (localHostOrDomainIs(host, "trust.zscalerone.net")) ||
	        (dnsDomainIs(host, "google.com")) ||
                    (localHostOrDomainIs(host, "trust.zscalertwo.net")) ||
                    (localHostOrDomainIs(host, "trust.zscalerthree.net")) ||
                    (localHostOrDomainIs(host, "trust.zscalergov.net")) ||
                    (localHostOrDomainIs(host, "trust.zsdemo.net")) ||
                    (localHostOrDomainIs(host, "trust.zscloud.net")) ) &&
                (url.substring(0,5) == "http:" || url.substring(0,6) == "https:"))
                return "DIRECT";
            
    
return splitPublicTraffic();
}