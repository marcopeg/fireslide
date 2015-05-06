

exports.createClient = function(type, className, target) {

    var wrapper = document.createElement('div');
    var reload = document.createElement('button');
    var iframe = document.createElement('iframe');
    var src = 'http://localhost:8080/#/' + type;

    wrapper.className = type + ' ' + className;

    iframe.src = src;
    iframe.border = '0';

    wrapper.appendChild(iframe);
    wrapper.appendChild(reload);

    reload.innerHTML = 'reload';
    reload.onclick = function() {
        iframe.contentWindow.location.reload();
    };

    if (target) {
        document.querySelector(target).appendChild(wrapper);
    } else {
        return wrapper;
    }
};