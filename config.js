import { cpus } from "os";

const config = {
  // Number of workers, intially determined by number of cpus
  //   NUMBER_OF_WORKERS: cpus().length,
  NUMBER_OF_WORKERS: 4,
  // min and max delay in miliseconds
  MIN_DELAY: 1000,
  MAX_DELAY: 5000,
};

export default config;
