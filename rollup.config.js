import nodeResolve from 'rollup-plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

const DEV = process.env.NODE_ENV === 'development';


export default {
    input: 'src/index.js',
    output: {
        file: 'demo/components.js',
        format: 'iife'
    },
    plugins: [
        nodeResolve(),
        DEV && serve({
            contentBase: './',
            port: 8080
        }),
        DEV && livereload({
            watch: 'demo'
        })
    ]
}
