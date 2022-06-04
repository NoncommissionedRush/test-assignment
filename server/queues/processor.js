import randomNumber from "../services/random-number.js";
import config from "../config.js";

const processor = async (_job) => {
 return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve(true);
    }, randomNumber(config.MIN_DELAY, config.MAX_DELAY));
  });
};

export default processor;
