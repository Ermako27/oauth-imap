import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import html from 'rollup-plugin-bundle-html';


module.exports = [
    {
        input: 'src/index.js',
        output: {
            file: 'dist/lib.js',
            format: 'umd',
            name: 'Lib',
            sourcemap: true,
        },
        plugins: [
            nodeResolve(),
            commonjs(),
            html({
                template: './src/index.html',
                dest: 'dist/',
                filename: 'index.html',
                inject: 'head',
            }),
        ],
    },
];
