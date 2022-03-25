import randomNumber from "../services/random-number.js";
import config from "../config.js";

const processor = async (job) => {
  const start = Date.now();
  // random delay between 1000 and 5000 milis
  while (
    Date.now() - start <
    randomNumber(config.MIN_DELAY, config.MAX_DELAY)
  ) {}
  return true;
};

export default processor;
