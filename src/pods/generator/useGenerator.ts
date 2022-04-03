import SHA3 from 'crypto-js/sha3';
import useSWRImmutable from 'swr/immutable';

import { GeneratorOptions } from './types';

const fetcher = (seed: string, count: number, maxLength: number) => {
  const countArray = new Array(...new Array(count).keys());

  return countArray.map((idx: string) =>
    SHA3(`${seed}${idx}`).toString().slice(0, maxLength)
  );
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
