import Queue from "bull";
import processor from "./processor.js";
import config from "../config.js";

const spawnQueue = (workerId) => {
  const queue = new Queue(`queue-${workerId}`, {
    limiter: { max: config.QUEUE_SIZE, duration: config.TIME_LIMIT },
  });

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
