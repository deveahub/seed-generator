import { useRecoilState } from 'recoil';

import optionsAtom from './optionsAtom';

const useGeneratorOptions = () => {
  const [options, setOptions] = useRecoilState(optionsAtom);

  const onChangeSeed = (seed: string) => {
    setOptions((currOptions) => ({ ...currOptions, seed }));
  };

  const onChangeCount = (count: number) => {
    setOptions((currOptions) => ({ ...currOptions, count }));
  };

  const onChangeMaxLength = (maxLength: number) => {
    setOptions((currOptions) => ({ ...currOptions, maxLength }));
  };

  return {
    options,
    handlers: {
      onChangeSeed,
      onChangeCount,
      onChangeMaxLength,
    },
  };
};

export default useGeneratorOptions;
