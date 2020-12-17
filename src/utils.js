

exports.timeout = function( ms ) {
    return new Promise((resolve) => setTimeout(() => resolve(), ms ))
}

exports.getSecMs = function( ) {
    var d = new Date();

    return ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2) + "." + ("00" + d.getMilliseconds()).slice(-3);
}

