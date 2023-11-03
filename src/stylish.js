import _ from "lodash";


const formatNode = (node, indent) => {
    const formatValue = (value) => {
        if (_.isObject(value)) {
            const keys = Object.keys(value);
            const result = keys.map((key) => `${indent}    ${key}: ${formatValue(value[key])}`).join('\n');
            return `{\n${result}\n${indent}  }`;
        }

        return value !== null ? String(value) : null;
    };

    const formatRemovedKey = (key, value) => `${indent}- ${key}: ${formatValue(value)}`;
    const formatAddedKey = (key, obj) => `${indent}+ ${key}: ${formatValue(obj[key])}`;
    const formatModifiedKey = (key, obj1, obj2) => {
        const oldValue = obj1 && obj1[key] ? formatValue(obj1[key]) : 'null';
        const newValue = obj2 && obj2[key] ? formatValue(obj2[key]) : 'null';
        return `${indent}- ${key}: ${oldValue}\n${indent}+ ${key}: ${newValue}`;
    };
    const formatUnchangedKey = (key, obj) => `${indent}  ${key}: ${formatValue(obj[key])}`;

    switch (node.type) {
        case 'deleted':
            return formatRemovedKey(node.key, node.value);
        case 'added':
            return formatAddedKey(node.key, node.value);
        case 'modified':
            return formatModifiedKey(node.key, node.oldValue, node.newValue);
        case 'unchanged':
            return formatUnchangedKey(node.key, node.value);
        case 'nested':
            const children = node.children.map((child) => formatNode(child, `${indent}    `)).join('\n');
            return `${indent}  ${node.key}: {\n${children}\n${indent}  }`;
    }
};

const formatTree = (tree) => {
    const result = tree.map((node) => formatNode(node, '')).join('\n');
    return `{\n${result}\n}`;
};

export default formatTree;