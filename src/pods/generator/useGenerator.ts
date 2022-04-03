import SHA3 from 'crypto-js/sha3';
import useSWRImmutable from 'swr/immutable';

import { GeneratorOptions } from './types';

const SPECIAL_CHARACTERS = ['!', '$', '%', '&', '?', '+', '-', '*', '^', '='];

const uppercaseWhenIdxIsEven = (word: string, idx: number) =>
  idx % 2 === 0 ? word.toUpperCase() : word;

let specialCharactersCount = 0;

const replaceWithSpecialCharacterWhenIdxIsEven = (
  digit: string,
  idx: number
) => {
  if (idx % 2 === 0) return digit;
  const output = SPECIAL_CHARACTERS[specialCharactersCount];
  specialCharactersCount =
    SPECIAL_CHARACTERS.length - 1 === specialCharactersCount
      ? 0
      : specialCharactersCount + 1;
  return output;
};

const formatPassword = (password: string) =>
  new Array(...new Array(password.length).keys()).reduce((acc, _, idx) => {
    const character = password[idx];
    const isWord = /[a-z]/.test(character);

    return `${acc}${
      isWord
        ? uppercaseWhenIdxIsEven(character, idx)
        : replaceWithSpecialCharacterWhenIdxIsEven(character, idx)
    }`;
  }, '');

const fetcher = (seed: string, count: number, maxLength: number) => {
  const countArray = new Array(...new Array(count).keys());

  return countArray.map((idx: string) => {
    const password = SHA3(`${seed}${idx}`).toString();
    const formatedPassword = formatPassword(password);
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
