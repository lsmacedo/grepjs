export const runWithErrorHandler = async (fn: Promise<unknown>) => {
  try {
    await fn;
  } catch (err) {
    if (err instanceof KnownError) {
      console.error(err.message);
    } else {
      console.error(err);
    }
  }
};

class KnownError extends Error {}

export class InvalidArgsError extends KnownError {}
