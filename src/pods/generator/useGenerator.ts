import SHA3 from 'crypto-js/sha3';
import useSWRImmutable from 'swr/immutable';

import { GeneratorOptions } from './types';
import { formatPassword } from './utils';

const fetcher = (seed: string, count: number, maxLength: number) => {
  const countArray = new Array(...new Array(count).keys());

  return countArray.map((key: string) => {
    const password = SHA3(`${seed}${key}`).toString();
    const formatedPassword = formatPassword(password, key.toString());
    return formatedPassword.slice(0, maxLength);
  });
};

const useGenerator = ({ seed, count, maxLength }: GeneratorOptions) => {
  const { data, error, isValidating } = useSWRImmutable(
    seed ? [seed, count, maxLength] : null,
    fetcher
  );

  return {
    data,
    error,
    isLoading: isValidating && Boolean(data),
  };
};

export default useGenerator;
