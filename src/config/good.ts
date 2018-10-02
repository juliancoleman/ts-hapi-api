import { ServerRegisterPluginObject } from "hapi";

// The generic type of ServerRegisterPluginObject must be
// of type unknown` because there are no type definitions
// for the `Good` node library. If at some point those type
// definitions become available, that type will be used
// instead.
export default<ServerRegisterPluginObject<unknown | NodeRequire>> {
  plugin: require("good"),
  options: {
    ops: { interval: 1000 },
    reporters: {
      console: [
        {
          module: "good-squeeze",
          name: "Squeeze",
          args: [{ log: "*", response: "*" }],
        },
        {
          module: "good-console",
          args: [{ format: "MM/DD/YYYY HH:mm:ss A" }],
        },
        "stdout",
      ],
    },
  },
};
