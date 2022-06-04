import { cpus } from "os";

const config = {
  // Number of workers, intially determined by number of cpus
  NUMBER_OF_WORKERS: process.env.NUMBER_OF_WORKERS || cpus().length,
  // min and max delay in miliseconds
  MIN_DELAY: process.env.MIN_DELAY || 1000,
  MAX_DELAY: process.env.MAX_DELAY || 5000,
  // limit queue to max 1000 tasks in 5 seconds
  QUEUE_SIZE: process.env.QUEUE_SIZE || 1000,
  TIME_LIMIT: process.env.TIME_LIMIT || 5000,
  DEFAULT_ATTEMPTS: process.env.DEFAULT_ATTEMPTS || 3,
  TEST_ENV: process.env.TEST_ENV || "malehovienko",
};

export default config;
