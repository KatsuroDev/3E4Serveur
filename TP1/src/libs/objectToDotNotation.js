export default (args) => {
    const setObject = {};
    Object.keys(args).forEach((key) => {
      if (typeof args[key] === 'object') {
        Object.keys(args[key]).forEach((subkey) => {
          setObject[`${key}.${subkey}`] = args[key][subkey];
        });
      } else {
        setObject[key] = args[key];
      }
    });
    return setObject;
};