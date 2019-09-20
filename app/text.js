const React = require('react');
import PropTypes from 'prop-types';

class Text extends React.Component {

    render() {
        return (
                <div>
                <h1>Demo of the cubehelix NPM library</h1>
                <p>
                <a href='https://github.com/mperdikeas/js-cubehelix-demo'>Github repo</a>
                </p>
                <p>
                This demo is built using
            the <a href='https://www.npmjs.com/package/cubehelix'>cubehelix npm package</a> which
            implements Dave Green's <span className='cubehelix'>cubehelix</span> algorithm.
            </p>
                <p>
                The motivation for the <span className='cubehelix'>cubehelix</span> algorithm
            is the following: assume you are
            given a 2D matrix of numerical values. E.g. each coordinate of the matrix holds a single
            scalar (one-dimensional) numeric value (float or integer). Such matrixes are common in
            astronomy but can also be used to represent, e.g. the salinity of the ocean (at the surface),
            or the average rainfall over an area.
                Suppose then that you are further asked to prepare a visualization
            for the contents of said matrix. The simplest approach would be to linearly map the range
            [min, max] of values to some gray-scale. E.g. map the lowest value to black, the highest
            to white and linearly interpolate all intermediate values.
                </p>
                <p>
                But what if you wanted to produce a visualization using color?
                All color spaces are inherently three-dimensional (e.g. RGB is a cube, HSL is
                                                                   a cylinder and so on). How to map one dimensional values to three dimensions?
                </p>
                <p>
                The problem is to devise an appropriate arrangement of a path in the 3D RGB space such
            that:
                <ul>
                <li>at the beginning of the path you have the darkest possible colour (black),
            at the end of the path you have the lightest possible colour (white)</li>
                <li>as you
            progress, from the beginning towards the end of the path, a variety of colours are 
            employed</li>
                <li>the perceived brightness monotonically increases.</li>
                </ul>
                </p>
                <p>
                This is further complicated by the fact that the brightness perceived
            by the human eye does not assign equal weight to the three dimensions of the RGB
            space (bright green appears much more luminous than bright blue).
                </p>
                <p>
                The <span className='cubehelix'>cubehelix</span> algorithm generates such a
            function, actually a family of such mapping functions,
            that map intensity values in the [0, 1] range to a wide
            variety of color in the RGB space such that as a variable <tt>x</tt> proceeds
            from 0 to 1,
            the perceived brightness of the color to which that value <tt>x</tt> is
            mapped monotonically increases. It does so by arranging a tapered helix in the 3D RGB space.
                </p>
                <p>
                The paper defining the <i>cubehelix</i> algorithm
            is available <a href='http://astron-soc.in/bulletin/11June/289392011.pdf'>here</a>.
                The algorithm is also discussed <a href='http://www.mrao.cam.ac.uk/~dag/CUBEHELIX/'>here</a>.
                A more general discussion on the topic of colormaps is
            available <a href='https://jakevdp.github.io/blog/2014/10/16/how-bad-is-your-colormap/'>here</a>.
                </p>
                <p>
                Four parameters (<i>start</i>, <i>rotations</i>, <i>hue</i> and <i>gamma</i>)
            control the exact shape of the helix. Modifying these parameters gives rise to a number
            of different mapping functions that all exhibit the crucial monotonically increasing luminance
            property.
                </p>
                <p>
                In the diagram below the horizontal axis stands for variable <tt>x</tt> described above.
                Variable <tt>x</tt> takes values in the [0, 1] range. That value is then mapped to a color
                in the RGB space according to the <i>cubehelix</i> algorithm. As mentioned,
            the <i>cubehelix</i> algorithm is capable of generating a family of such mapping functions according
            to four configuration parameters (see below) that control the shape of the helix.
                </p>
                <p>
                The R, G and B components of the color (to which variable <tt>x</tt> is mapped) are represented by
            the  <span style={{color: 'red', fontWeight: 'bold'}}>red</span>,&nbsp;
                <span style={{color: 'green', fontWeight: 'bold'}}>green</span>,
            and <span style={{color: 'blue', fontWeight: 'bold'}}>blue</span> lines in the plot below.
                </p>
                <p>
                The solid <span className='bold'>black</span> line that runs diagonally across the plot is the brightness
            perceived by the human eye. You will
            notice that for certain helix configuration parameters, the R, G or B values fall outside of 
            the [0, 1] range. When this happens to an obscene degree, the monotonicity of the
            perceived brightness function (the <span className={'bold'}>black</span> line in the plot)
            may suffer a little. In particular, the <i>hue</i> and the <i>gamma</i> configuration
            parameters are the two that can more easily disrupt the shape of the perceived brightness
            function.
                </p>
                </div>
        );
    }
}

export default Text;
