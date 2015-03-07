
module.exports = function(src, done, timeout) {
    var img = new Image();

    timeout = setTimeout(function() {
        done('timeout', src);
    }, timeout || 5000);

    img.onload = function() {
        clearTimeout(timeout);
        done(null, src);
    };

    // fake delay
    setTimeout(function() {
        img.src = src;  
    }, (Math.floor(Math.random() * 25) + 5) * 100);
};
