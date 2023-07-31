export const toEpoch = (date: Date | string) => {
  return Math.floor(new Date(date).getTime() / 1000);
};

const date = { toEpoch };

export async function timeout(ms: number): Promise<void> {
  return new Promise((resolve) => {
    const startTime = new Date().getTime();

    const checkTimeout = () => {
      const currentTime = new Date().getTime();
      const elapsedTime = currentTime - startTime;

      if (elapsedTime >= ms) {
        resolve();
      } else {
        setTimeout(checkTimeout, 10); // Check every 10ms
      }
    };

    setTimeout(checkTimeout, 10); // Start the timeout check
  });
}

export default date;
