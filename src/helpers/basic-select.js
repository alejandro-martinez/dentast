// eslint-disable-next-line import/prefer-default-export
export const toOptionFormat = (obj, propName) => {
  const prop = typeof propName === 'string' ? propName : 'name';
  if (obj) {
    return {
      text: obj[prop],
      value: obj._id,
    };
  }
  return {
    text: '',
    value: '',
  };
};

