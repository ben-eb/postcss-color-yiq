import color from 'color';
import names from 'css-color-names';
import postcss from 'postcss';
import valueParser, {stringify} from 'postcss-value-parser';

const plugin = 'postcss-color-yiq';

function err (node) {
    throw node.parent.error('No background color was found.', {plugin: plugin});
}

function getYIQContrast (colour) {
    let [r, g, b] = color(colour).rgbArray();
    let yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? '#000' : '#fff';
}

export default postcss.plugin(plugin, () => {
    return css => {
        css.walkDecls('color', decl => {
            if (decl.value !== 'yiq') {
                return;
            }

            let background = decl.parent.nodes.filter(({prop}) => {
                return prop === 'background' || prop === 'background-color';
            }).pop();

            if (typeof background === 'undefined') {
                err(decl);
            }

            let hasColour = false;

            decl.value = valueParser(background.value).walk(node => {
                if (node.type === 'function' && /^(rgb|hsl)a?$/.test(node.value)) {
                    node.value = getYIQContrast(stringify(node));
                    node.type = 'word';
                    hasColour = true;
                    return;
                }
                if (node.type === 'word') {
                    if (!node.value.indexOf('#')) {
                        node.value = getYIQContrast(node.value);
                        hasColour = true;
                        return;
                    } else if (node.value in names) {
                        node.value = getYIQContrast(names[node.value]);
                        hasColour = true;
                        return;
                    }
                }
                node.value = '';
                node.nodes = null;
            }).toString();

            if (!hasColour) {
                decl.value = 'yiq';
                err(decl);
            }
        });
    };
});
