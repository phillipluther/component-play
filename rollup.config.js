import nodeResolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import precss from 'precss';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import {terser} from 'rollup-plugin-terser';


const ENV = process.env.NODE_ENV;

export default {
    input: 'src/index.js',
    output: {
        file: 'demo/index.js',
        format: 'iife',
        name: 'componentPlay'
    },
    plugins: [
        nodeResolve(),
        postcss({
            inject: false,
            plugins: [
                precss()
            ]
        }),
        // dev-specific
        ENV !== 'production' && serve({
            contentBase: 'demo',
            open: false,
            port: 8080
        }),
        ENV !== 'production' && livereload({
            watch: 'demo'
        }),
        // prod-specific
        ENV === 'production' && terser()
    ]
};
