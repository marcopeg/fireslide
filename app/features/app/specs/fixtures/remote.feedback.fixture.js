module.exports = {
    state: {
        mode: 'remote',
        slides: [
            'assets/slides/slides.001.jpg',
            'assets/slides/slides.002.jpg',
            'assets/slides/slides.003.jpg'
        ],
        tips: [
            '','b',''
        ],
        cached: 3,
        current: 1,
        syncing: true,
        voteGood: 3,
        voteBored: 2,
        votePanic: 10
    },
    defaultAction: 'fake',
    actions: {
        'set-tip-resizing': false,
        'set-tip-height': false,
        'next': false,
        'prev': false,
        'set-slide': false,
        'reset-vote': false,
    }
};