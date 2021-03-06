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


## API

### yiq([options])

#### options

##### dark

Type: `string`
Default: `#000`

Pass another hex color to customise the foreground color when the background
is dark.

##### light

Type: `string`
Default: `#fff`

Pass another hex color to customise the foreground color when the background
is light.


## Usage

See the [PostCSS documentation](https://github.com/postcss/postcss#usage) for
examples for your environment.


## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars.githubusercontent.com/u/1282980?v=3" width="100px;"/><br /><sub>Ben Briggs</sub>](http://beneb.info)<br />[💻](https://github.com/ben-eb/postcss-color-yiq/commits?author=ben-eb) [📖](https://github.com/ben-eb/postcss-color-yiq/commits?author=ben-eb) 👀 [⚠️](https://github.com/ben-eb/postcss-color-yiq/commits?author=ben-eb) | [<img src="https://avatars.githubusercontent.com/u/582828?v=3" width="100px;"/><br /><sub>Vince Speelman</sub>](vinspee.me)<br />[💻](https://github.com/ben-eb/postcss-color-yiq/commits?author=VinSpee) | [<img src="https://avatars.githubusercontent.com/u/5635476?v=3" width="100px;"/><br /><sub>Bogdan Chadkin</sub>](https://github.com/TrySound)<br />👀 |
| :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors] specification. Contributions of
any kind welcome!

## License

MIT © [Ben Briggs](http://beneb.info)


[all-contributors]: https://github.com/kentcdodds/all-contributors
[ci]:      https://travis-ci.org/ben-eb/postcss-color-yiq
[deps]:    https://gemnasium.com/ben-eb/postcss-color-yiq
[npm]:     http://badge.fury.io/js/postcss-color-yiq
[postcss]: https://github.com/postcss/postcss
