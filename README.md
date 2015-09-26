# [postcss][postcss]-color-yiq [![Build Status](https://travis-ci.org/ben-eb/postcss-color-yiq.svg?branch=master)][ci] [![NPM version](https://badge.fury.io/js/postcss-color-yiq.svg)][npm] [![Dependency Status](https://gemnasium.com/ben-eb/postcss-color-yiq.svg)][deps]

> Set foreground text color based on the YIQ color space.

## Install

With [npm](https://npmjs.org/package/postcss-color-yiq) do:

```
npm install postcss-color-yiq --save
```

## Example

Given a background color, postcss-color-yiq will transform the `yiq` placeholder
to `#000` or `#fff` depending on which has a more suitable contrast. It's
useful in combination with modules such as https://github.com/postcss/postcss-simple-vars
& https://github.com/pascalduez/postcss-map, and works with hex, rgb, hsl and
CSS color keywords.

### Input

```css
h1 {
    color: yiq;
    background: #ff0066;
}
```

### Output

```css
h1 {
    color: #fff;
    background: #ff0066;
}
```

## Usage

See the [PostCSS documentation](https://github.com/postcss/postcss#usage) for
examples for your environment.

## Contributing

Pull requests are welcome. If you add functionality, then please add unit tests
to cover it.

## License

MIT © [Ben Briggs](http://beneb.info)

[ci]:      https://travis-ci.org/ben-eb/postcss-color-yiq
[deps]:    https://gemnasium.com/ben-eb/postcss-color-yiq
[npm]:     http://badge.fury.io/js/postcss-color-yiq
[postcss]: https://github.com/postcss/postcss
