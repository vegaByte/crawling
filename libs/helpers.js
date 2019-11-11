async function sleep(timeout) {
  return new Promise((resolve, error) => {
    setTimeout(resolve, timeout)
  })
};

module.exports.sleep = sleep
