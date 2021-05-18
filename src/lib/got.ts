import {CancelableRequest, RequestError, Response} from 'got';

// Wrapper to avoid throwing non-serializable circular errors
const gotWrapper = async <T>(request: CancelableRequest<Response<T>>): Promise<Response<T>> => {
  try {
    const response = await request;

    if (response.url.includes('down')) {
      // Banner services are down
      throw new Error('Banner services are currently down.');
    }

    return response;
  } catch (error: unknown) {
    if (error instanceof RequestError) {
      throw new Error(`Request error: ${error.code ?? ''} ${error.request?.requestUrl ?? ''} ${error.response?.statusCode ?? ''}`);
    }

    throw error;
  }
};

export default gotWrapper;
