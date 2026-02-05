export class BadRequestError extends Error {
  status = 400;
}

export class NotFoundError extends Error {
  status = 404;
}

export class DataLoadError extends Error {
  status = 500;
  original?: Error;

  constructor(message: string, original?: Error) {
    super(message);
    this.original = original;
  }
}
