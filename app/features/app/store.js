/**
 * FireSlide
 * application store
 *
 * -- a store holds data responsibilities --
 *
 * it is responsible for knowing what data is needed in order
 * to render the UI and how data should change responding to
 * a given action.
 *
 * "actions" are the interface for UI to change data.
 *
 */
var Fluxo = require('fluxo');

module.exports = Fluxo.createStore(true, {

    // initial data schema
    initialState: {
        current: 0,

        // still synchronous... will it be like this forever?
        // I don't think so!
        slides: [
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
        ]
    },

    // actions manifesto
    actions: [
        'next'
    ],

    // action data implementation
    // here is defined how an action modifies the state in the store
    onNext() {
        var next = this.state.current + 1;

        if (next >= this.state.slides.length) {
            console.log('there are no more slides!');
            return;
        }

        this.setState({
            current: next
        });
    }

});
