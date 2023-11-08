import _ from 'lodash';

const calculateIndent = (depth, spacesCount = 4) => {
    const count = spacesCount * depth - 2;
    return count >= 0 ? ' '.repeat(count) : '  ';
};

const stringify = (value, depth = 1) => {
    const currentIndent = calculateIndent(depth + 1);
    const bracketIndent = calculateIndent(depth);

    if (_.isObject(value)) {
        const lines = Object.entries(value).map(([key, val]) => `${currentIndent}  ${key}: ${stringify(val, depth + 1)}`);
        return `{\n${lines.join('\n')}\n${bracketIndent}  }`;
    }

    return String(value);
};

const formatNode = (node, depth = 1) => {
    const indent = calculateIndent(depth);

    switch (node.type) {
        case 'deleted':
            return `${indent}- ${node.key}: ${stringify(node.value, depth)}`;
        case 'added':
            return `${indent}+ ${node.key}: ${stringify(node.value, depth)}`;
        case 'modified':
            const oldValue = stringify(node.oldValue, depth);
            const newValue = stringify(node.newValue, depth);
            return `${indent}- ${node.key}: ${oldValue}\n${indent}+ ${node.key}: ${newValue}`;
        case 'unchanged':
            return `${indent}  ${node.key}: ${stringify(node.value, depth)}`;
        case 'nested':
            const children = node.children.map((child) => formatNode(child, depth + 1)).join('\n');
            return `${indent}  ${node.key}: {\n${children}\n${indent}  }`;
    }
};

const formatTree = (tree) => {
    const result = tree.map((node) => formatNode(node, 1)).join('\n');
    return `{\n${result}\n}`;
};

export default formatTree;
