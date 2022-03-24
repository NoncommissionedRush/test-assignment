import cluster from "cluster";
import process from "./process.js";
import config from "./config.js";

// function to calculate random number
function randommInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

if (cluster.isPrimary) {
  // fork workers
  for (let i = 0; i < config.NUMBER_OF_WORKERS; i++) {
    cluster.fork();
  }

  // listen for dying workers
  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // run forked process
  process(cluster.worker.id);
}
