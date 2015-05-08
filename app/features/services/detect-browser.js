var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
var Safari = ( navigator.userAgent.match(/(Safari)/g) ? true : false );
var Chrome = ( navigator.userAgent.match(/(Chrome)/g) ? true : false );
var useAV = !iOS;

if (Safari && !Chrome) {
    useAV = false;
}

module.exports = {
    useAV: useAV
};