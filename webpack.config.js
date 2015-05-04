/**
 * Webpack Configuration
 * =====================
 *
 * Workspace fills the whole Webpack configuration for you,
 * still you can override every single option for both "dev" and "prod" scenario.
 *
 */

exports.dev = function() {
    return {
        output: {
            libraryTarget: 'umd',
            library: ['fireslide']
        },
        externals: {
            'react' : 'React',
            'firebase' : 'Firebase',
            'opentok' : 'OT',
            'presentation-data' : 'mySlides'
        }
    };
};

exports.prod = function() {
    return {};
};
