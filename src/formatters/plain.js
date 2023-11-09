import _ from 'lodash';

const formatPlain = (tree, parentKey = '') => {
  const stringifyValue = (value) => {
    if (_.isObject(value)) {
      return '[complex value]';
    }
    if (_.isString(value)) {
      return `'${value}'`;
    }
    return value;
  };

  const renderNode = (node) => {
    const key = parentKey ? `${parentKey}.${node.key}` : node.key;

    switch (node.type) {
      case 'added':
        return `Property '${key}' was added with value: ${stringifyValue(node.value)}\n`;
      case 'deleted':
        return `Property '${key}' was removed\n`;
      case 'modified':
        return `Property '${key}' was updated. From ${stringifyValue(node.oldValue)} to ${stringifyValue(node.newValue)}\n`;
      case 'nested':
        return node.children.map((child) => renderNode(child)).join('');
      case 'unchanged':
        return '';
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  };

  return tree.map((node) => renderNode(node)).join('');
};

export default formatPlain;
