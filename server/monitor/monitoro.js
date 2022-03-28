import config from "../config.js";

let queues = [];

for (let i = 1; i <= config.NUMBER_OF_WORKERS; i++) {
  queues.push(`queue-${i}`);
}

export const queueConfigArray = queues.map((q) => {
  return {
    name: q,
    hostId: "redis",
    url: "http://redis/6379",
  };
});
