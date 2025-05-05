/**
 * Generic utility for handling API requests with loading state and error handling
 * @param requestFn The function that makes the actual API request
 * @param setIsLoading Function to set loading state
 * @param setError Function to set error state
 * @param errorMessage Error message to use if the request fails
 * @returns A function that executes the API request with error handling
 */
export const createApiRequest = <T>(
  requestFn: () => Promise<T>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  errorMessage: string
) => {
  return async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await requestFn();
      setIsLoading(false);
      return response;
    } catch (err) {
      setError(errorMessage);
      setIsLoading(false);
      throw err;
    }
  };
};