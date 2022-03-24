import config from "./config.js";
import express from "express";
import Queue from "bull";

// function to calculate random number
function randommInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const process = (workerId) => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // create a queue
  const queue = new Queue(`queue-${workerId}`);

  // on post request, add a task to the queue
  app.post("/", (req, res) => {
    const { number } = req.body;

    queue.add({
      number,
    });

    // send the notification with queue id
    res.json({
      message: `Job added to be processed by ${queue.name}`,
    });
  });

  // process the tasks in queue
  queue.process(async (job) => {
    const start = Date.now();
    // random delay between 1000 and 5000 milis
    while (
      Date.now() - start <
      randommInterval(config.MIN_DELAY, config.MAX_DELAY)
    ) {}
    return true;
  });

  // on task completion, log the result
  queue.on("completed", (job, result) => {
    console.log(`Job completed with result: ${result}`);
  });

  // when queue is drained
  queue.on("drained", () => {
    console.log(`Queue drained`);
  });

  app.listen(5000, () => {
    console.log("Server is running on port 5000");
  });
};

export default process;
