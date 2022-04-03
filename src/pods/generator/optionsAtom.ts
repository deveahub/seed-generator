import { atom } from 'recoil';

import { GeneratorOptions } from './types';

const optionsAtom = atom<GeneratorOptions>({
  key: 'generator-options',
  default: {
    seed: '',
    count: 5,
    maxLength: 50,
  },
});

export default optionsAtom;
