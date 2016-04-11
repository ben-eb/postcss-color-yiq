import ava from 'ava';
import postcss from 'postcss';
import plugin from '../';
import pkg from '../../package.json';

let name = pkg.name;

let tests = [{
    message: 'should return a light colour',
    fixture: 'h1{color:yiq;background-color:#ff0066}',
    expected: 'h1{color:#fff;background-color:#ff0066}'
}, {
    message: 'should return a dark colour',
    fixture: 'h1{color:yiq;background-color:#00ff00}',
    expected: 'h1{color:#000;background-color:#00ff00}'
}, {
    message: 'should work with shorthand hexes',
    fixture: 'h1{color:yiq;background-color:#0f0}',
    expected: 'h1{color:#000;background-color:#0f0}'
}, {
    message: 'should work with colour functions',
    fixture: 'h1{color:yiq;background-color:rgba(255, 255, 0, 1)}',
    expected: 'h1{color:#000;background-color:rgba(255, 255, 0, 1)}'
}, {
    message: 'should work with colour names',
    fixture: 'h1{color:yiq;background-color:yellow}',
    expected: 'h1{color:#000;background-color:yellow}'
}, {
    message: 'should work with the background shorthand',
    fixture: 'h1{color:yiq;background: url("a.png") #00ffff repeat-y fixed}',
    expected: 'h1{color:#000;background: url("a.png") #00ffff repeat-y fixed}'
}, {
    message: 'should pass through on non-yiq declarations',
    fixture: 'h1{color:#fff;background:#fff}',
    expected: 'h1{color:#fff;background:#fff}'
}, {
    message: 'should work with custom light colours',
    fixture: 'h1{color:yiq;background:#000}',
    expected: 'h1{color:yellow;background:#000}',
    options: {light: 'yellow'}
}, {
    message: 'should work with custom dark colours',
    fixture: 'h1{color:yiq;background:#fff}',
    expected: 'h1{color:navy;background:#fff}',
    options: {dark: 'navy'}
}];

tests.forEach(test => {
    ava(test.message, t => {
        let options = test.options || {};
        return postcss([ plugin(options) ]).process(test.fixture).then(result => {
            t.deepEqual(result.css, test.expected);
        });
    });
});

ava('should use the postcss plugin api', t => {
    t.truthy(plugin().postcssVersion, 'should be able to access version');
    t.deepEqual(plugin().postcssPlugin, name, 'should be able to access name');
});

ava('should throw when a background is not defined', t => {
    t.throws(() => {
        return postcss([ plugin ]).process('h1{color:yiq}').css;
    });
});

ava('should throw when a background color is not found', t => {
    t.throws(() => {
        return postcss([ plugin ]).process('h1{color:yiq;background:url(cat.jpg)}').css;
    });
});
