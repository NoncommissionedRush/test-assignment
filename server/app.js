import cluster from "cluster";
import express from "express";
import config from "./config.js";
import monitorRoutes from "./monitor/routes.js";
import spawnQueue from "./queues/index.js";

if (cluster.isMaster) {
  // fork workers
  for (let i = 0; i < config.NUMBER_OF_WORKERS; i++) {
    cluster.fork();
  }

  // listen for dying workers
  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else if (cluster.isWorker) {
  // run forked process
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use("/", monitorRoutes);

  // create a queue
  const queue = spawnQueue(cluster.worker.id);

  // on post request, add a task to the queue
  app.post("/", (req, res) => {
    queue.add(
      {},
      {
        attempts: config.DEFAULT_ATTEMPTS,
      }
    );
    // send the notification with queue id
    res.json({
      message: `Job added to be processed by worker ${cluster.worker.id}`,
    });
  });

  app.listen(5000, () => {
    console.log("Server is running on port 5000");
  });
} else {
  console.log("unknown cluster state");
}
