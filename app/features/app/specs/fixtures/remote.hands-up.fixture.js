module.exports = {
    state: {
        mode: 'remote',
        slides: [
            'assets/slides/slides.001.jpg',
            'assets/slides/slides.002.jpg',
            'assets/slides/slides.003.jpg'
        ],
        tips: [
            '',
            'ipsum lorem something here',
            ''
        ],
        cached: 3,
        current: 1,
        syncing: true,
        raisedHands: 1,
        voteGood: 3,
        voteBored: 2,
        votePanic: 10
    },
    actions: {
        'new-slides': true,
        'reset-raised-hands': function() {
            this.store.setState('raisedHands', 0);
        }
    }
};