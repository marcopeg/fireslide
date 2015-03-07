
/**
 * Store Mixin: slides loader
 * Simulates an asynchronous data load for the slides definition file.
 */

var slides = [
    'assets/slides/slides.001.jpg',
    'assets/slides/slides.002.jpg',
    'assets/slides/slides.003.jpg',
    'assets/slides/slides.004.jpg',
    'assets/slides/slides.005.jpg',
    'assets/slides/slides.006.jpg',
    'assets/slides/slides.007.jpg',
    'assets/slides/slides.008.jpg',
    'assets/slides/slides.009.jpg',
    'assets/slides/slides.010.jpg',
];

module.exports = {
    init() {
        var store = this.store;
        loadSlides(function(err, slides) {
            if (err) {
                console.error('Errors downloading the slides!');
                return;
            }
            store.trigger('load', slides);
        });
    }
};

// this can quickly be moved to a real AJAX fetch action!
function loadSlides(done) {
    setTimeout(function() {
        done(null, slides);
    });
}
