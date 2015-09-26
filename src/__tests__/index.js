import tape from 'tape';
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
}];

function procss (css, options, callback, e) {
    return postcss([ plugin(options) ]).process(css).then(callback, e);
}

tape(name, (t) => {
    t.plan(tests.length);

    tests.forEach(test => {
        let options = test.options || {};
        procss(test.fixture, options, result => {
            t.equal(result.css, test.expected, test.message);
        });
    });
});

tape('should use the postcss plugin api', t => {
    t.plan(2);
    t.ok(plugin().postcssVersion, 'should be able to access version');
    t.equal(plugin().postcssPlugin, name, 'should be able to access name');
});

tape('error handling', t => {
    t.plan(2);

    t.throws(() => {
        return postcss([ plugin ]).process('h1{color:yiq}').css;
    }, 'should throw when a background is not defined');

    t.throws(() => {
        return postcss([ plugin ]).process('h1{color:yiq;background:url(cat.jpg)}').css;
    }, 'should throw when a background color is not found');
});
