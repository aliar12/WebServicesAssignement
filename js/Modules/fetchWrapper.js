/**
 * A wrapper class for making HTTP requests using the Fetch API.
 * Provides a method to send HTTP requests with default and custom options.
 */
export class FetchWrapper {
  /**
   * Sends an HTTP request using the Fetch API.
   *
   * @param {string} uri The URI identifying the targeted resource to which the request will be sent.
   * @param {Object} [options={}] Optional configuration object for the request.
   * @returns {Promise<Object>} A promise that resolves with the parsed JSON response body from the server.
   * @throws {Error} Throws an error if the request fails (network errors or non-2xx HTTP status codes).
   *
   * @example
   * const fetchWrapper = new FetchWrapper();
   * try {
   *   const data = await fetchWrapper.sendRequest('https://api.tvmase.com/shows');
   *   console.log(data);
   * } catch (error) {
   *   console.error('Request failed:', error);
   * }
   */
  async sendRequest(uri, options = {}) {
    //* Default options to apply to every request.
    //* NOTE: These options can be overridden.
    const defaultOptions = {
      method: "GET",
      cache: "no-cache",
    };
    //* Merge default options with the supplied custom options.
    const requestOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    };
    try {
      //* Send the fetch request
      const response = await fetch(uri, requestOptions);

      //* Check if the request was successful (status in the range 200-299)
      if (!response.ok) {
        // Handle non-success responses (e.g., 404, 500)
        //!NOTE: Retrieve any error details from the response body for further processing.
        const errorInfo = await response.json();

        //TODO: You could implement a separate function for  throwing different types exceptions based on the received status code.

        //! Throw a custom exception containing the retrieved error details from.
        throw new CustomError(
          `Request failed with status ${response.status}`,
          response.status,
          errorInfo
        );
        //throw new Error(`Request failed with status ${response.status} reason: ${response.statusText}`);
      }
      //* Parse the response body as JSON (assuming JSON content)
      //* If the response doesn't contain JSON, this will throw an error.
      return await response.json();
    } catch (error) {
      // Handle network or other errors
      console.error("Error during fetch operation:", error);
      throw error; // Rethrow or return an error object as per your needs
    }
  }
}
export class CustomError extends Error {
  constructor(message, code, details) {
    super(message); // Call the parent constructor with the message
    this.name = this.constructor.name; // Set the error name to CustomError
    this.code = code; // Custom error code
    this.details = details; // Additional details or context

    // Optional: Ensure the stack trace is correct for this subclass
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
