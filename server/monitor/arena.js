import Arena from "bull-arena";
import Bull from "bull";
import config from "../config.js";

let queues = [];

for (let i = 1; i <= config.NUMBER_OF_WORKERS; i++) {
  queues.push(`queue-${i}`);
}

const arena = Arena(
  {
    Bull,
    queues: queues.map((q) => {
      return {
        name: q,
        hostId: "Queue server",
      };
    }),
  },
  {
    basePath: "/monitor",
    disableListen: true,
  }
);

export default arena;
