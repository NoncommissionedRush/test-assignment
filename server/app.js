import cluster from "cluster";
import express from "express";
import config from "./config.js";
import spawnQueue from "./queues/index.js";
import monitoro from "monitoro";
import { queueConfigArray } from "./monitor/monitoro.js";

if (cluster.isPrimary) {
  for (let i = 0; i < config.NUMBER_OF_WORKERS; i++) {
    cluster.fork();
  }

  // listen for dying workers
  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  const app = express();
  app.locals.MonitoroQueues = queueConfigArray;

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use("/monitor", monitoro);

  const queue = spawnQueue(cluster.worker.id);

  app.post("/", (req, res) => {
    queue.add(
      {},
      {
        attempts: config.DEFAULT_ATTEMPTS,
      }
    );
    res.json({
      message: `Job added to be processed by worker ${cluster.worker.id}`,
    });
  });

  app.listen(5000, () => {
    console.log("Server is running on port 5000");
  });
}
