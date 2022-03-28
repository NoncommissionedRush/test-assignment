import Queue from "bull";
import processor from "./processor.js";
import config from "../config.js";
import Redis from "ioredis";

const spawnQueue = (workerId) => {
  let client = new Redis({
    port: 6379,
    host: "redis",
    // host: "127.0.0.1",
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
  });
  let subscriber = new Redis({
    port: 6379,
    host: "redis",
    // host: "127.0.0.1",
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
  });

  let options = {
    createClient: function (type) {
      switch (type) {
        case "client":
          return client;
        case "subscriber":
          return subscriber;
        default:
          return new Redis({
            port: 6379,
            host: "redis",
            // host: "127.0.0.1",
            maxRetriesPerRequest: null,
            enableReadyCheck: false,
          });
      }
    },
    limiter: { max: config.QUEUE_SIZE, duration: config.TIME_LIMIT },
  };

  const queue = new Queue(`queue-${workerId}`, options);

  // process the tasks in queue
  queue.process(processor);

  queue.on("completed", (job, result) => {
    console.log(`Job ${job.id} completed by worker ${workerId}`);
  });

  queue.on("failed", (job, err) => {
    console.log(`Job ${job.id} failed with error: ${err}`);
  });

  // when queue is drained
  queue.on("drained", () => {
    console.log(`Queue drained`);
  });

  return queue;
};

export default spawnQueue;
