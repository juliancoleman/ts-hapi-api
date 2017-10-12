export default {
  register: import('good'),
  options: {
    ops: { interval: 1000 },
    reporters: {
      console: [
        {
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{ log: '*', response: '*' }],
        },
        {
          module: 'good-console',
          args: [{ format: 'MM/DD/YYYY HH:mm:ss A' }],
        },
        'stdout',
      ],
    },
  },
};
