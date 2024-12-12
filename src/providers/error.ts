export default class ProviderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ProviderError";

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ProviderError);
    }
  }
}
