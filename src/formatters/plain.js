import _ from 'lodash';

const stringifyValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const renderNode = (node, currentPath = '') => {
  const fullPath = currentPath ? `${currentPath}.${node.key}` : node.key;

  switch (node.type) {
    case 'added':
      return `Property '${fullPath}' was added with value: ${stringifyValue(node.value)}\n`;
    case 'deleted':
      return `Property '${fullPath}' was removed\n`;
    case 'modified':
      return `Property '${fullPath}' was updated. From ${stringifyValue(node.oldValue)} to ${stringifyValue(node.newValue)}\n`;
    case 'nested':
      return node.children.map((child) => renderNode(child, fullPath)).join('');
    case 'unchanged':
      return '';
    default:
      throw new Error(`Unknown node type: ${node.type}`);
  }
};

const formatPlain = (tree) => tree.map((node) => renderNode(node)).join('').trim();

export default formatPlain;
