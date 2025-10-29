import { runWithErrorHandler, InvalidArgsError } from '@src/errors';

describe('runWithErrorHandler', () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('executes function successfully without errors', async () => {
    const mockFn = jest.fn().mockResolvedValue(undefined);

    await runWithErrorHandler(mockFn);

    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('catches InvalidArgsError and logs only the message', async () => {
    const errorMessage = 'Invalid arguments';
    const mockFn = jest
      .fn()
      .mockRejectedValue(new InvalidArgsError(errorMessage));

    await runWithErrorHandler(mockFn);

    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(errorMessage);
  });

  it('catches unknown errors and logs the full error', async () => {
    const error = new Error('Unknown error');
    const mockFn = jest.fn().mockRejectedValue(error);

    await runWithErrorHandler(mockFn);

    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(error);
  });
});
