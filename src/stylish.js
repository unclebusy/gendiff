import _ from 'lodash';

const calculateIndent = (depth, spacesCount = 4) => {
    const count = spacesCount * depth - 2;
    return count >= 0 ? ' '.repeat(count) : '';
};

const stringify = (value, replacer = ' ', spacesCount = 4, depth = 1) => {
    const currentIndent = calculateIndent(depth, spacesCount);

    if (_.isObject(value)) {
        const bracketIndent = calculateIndent(depth - 1, spacesCount);
        const lines = Object.entries(value).map(([key, val]) => `${currentIndent}${key}: ${stringify(val, replacer, spacesCount, depth + 1)}`);
        return `{\n${lines.join('\n')}\n${bracketIndent}}`;
    }

    return String(value);
};

const formatNode = (node, indent, spacesCount) => {
    const formatValue = (value, depth) => {
        return _.isObject(value) ? stringify(value, ' ', spacesCount, depth) : String(value);
    };

    const currentIndent = calculateIndent(node.depth, spacesCount);
    const bracketIndent = calculateIndent(node.depth - 1, spacesCount);

    switch (node.type) {
        case 'deleted':
            return `${indent}- ${node.key}: ${formatValue(node.value, node.depth)}`;
        case 'added':
            return `${indent}+ ${node.key}: ${formatValue(node.value, node.depth)}`;
        case 'modified':
            const oldValue = formatValue(node.oldValue, node.depth);
            const newValue = formatValue(node.newValue, node.depth);
            return `${indent}- ${node.key}: ${oldValue}\n${indent}+ ${node.key}: ${newValue}`;
        case 'unchanged':
            return `${indent}  ${node.key}: ${formatValue(node.value, node.depth)}`;
        case 'nested':
            const children = node.children.map((child) => formatNode(child, `${indent}    `, spacesCount)).join('\n');
            return `${indent}  ${node.key}: {\n${children}\n${indent}  }`;
    }
};

const formatTree = (tree, spacesCount = 4) => {
    const result = tree.map((node) => formatNode(node, '', spacesCount)).join('\n');
    return `{\n${result}\n}`;
};

export default formatTree;