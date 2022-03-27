import { cpus } from "os";

const config = {
  // Number of workers, intially determined by number of cpus
  // NUMBER_OF_WORKERS: cpus().length,
  NUMBER_OF_WORKERS: 4,
  // min and max delay in miliseconds
  MIN_DELAY: 1000,
  MAX_DELAY: 5000,
  // limit queue to max 1000 tasks in 5 seconds
  QUEUE_SIZE: 1000,
  TIME_LIMIT: 5000,
  DEFAULT_ATTEMPTS: 3,
};

export default config;
