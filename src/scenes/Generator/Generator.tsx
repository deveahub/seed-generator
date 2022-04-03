import copy from 'copy-to-clipboard';
import Head from 'next/head';
import {
  Clipboard as ClipboardIcon,
  Save as SaveIcon,
  Shield as ShieldIcon,
} from 'react-feather';

import Button, { ButtonLink } from '@/components/Button';
import Input from '@/components/Input';
import Stack from '@/components/Stack';
import Text from '@/components/Text';
import TextArea from '@/components/TextArea';
import useToasts from '@/components/Toast/useToasts';
import { useDebounceValue } from '@/pods/common/hooks';
import { useGenerator, useGeneratorOptions } from '@/pods/generator';
import { styled } from '@/styles';

const StyledShieldIcon = styled(ShieldIcon, {
  color: '$primary',
});

const Generator = () => {
  const {
    options,
    handlers: { onChangeCount, onChangeMaxLength, onChangeSeed },
  } = useGeneratorOptions();
  const seedDebounced = useDebounceValue(options.seed);
  const toasts = useToasts();
  const maxLengthDebounced = useDebounceValue(options.maxLength);
  const { data } = useGenerator({
    ...options,
    seed: seedDebounced,
    maxLength: maxLengthDebounced,
  });

  const onCopyAll = () => {
    if (data) copy(data.join('\r\n'));
    toasts.add({ text: 'Copied to clipboard', type: 'success' });
  };

  const onSave = () => {
    if (data) {
      const link = document.createElement('a');
      const file = new Blob([data.join('\r\n')], { type: 'text/plain' });
      link.href = URL.createObjectURL(file);
      document.body.appendChild(link);
      link.download = 'secrets.txt';
      link.click();
      link.remove();
    }
  };

  return (
    <>
      <Head>
        <title>Generator password</title>
      </Head>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        css={{
          p: 4,
          height: '100%',
          gap: 2,
        }}
      >
        <StyledShieldIcon size={50} />
        <TextArea
          autoComplete="off"
          css={{
            width: '100%',
            maxWidth: '100vw',
            height: 200,
            resize: 'none',
          }}
          onChange={(e) => onChangeSeed(e.target.value)}
          value={options.seed}
        />
        {data && (
          <>
            <Stack
              css={{
                width: '100%',
                gap: 1,
              }}
            >
              <Input
                type="number"
                value={options.maxLength}
                max={150}
                onChange={(e) => onChangeMaxLength(Number(e.target.value))}
                css={{
                  width: 80,
                }}
              />
              <Input
                type="number"
                value={options.count}
                max={200}
                css={{
                  width: 80,
                }}
                onChange={(e) => onChangeCount(Number(e.target.value))}
              />
            </Stack>
            <Stack
              css={{
                width: '100%',
                gap: 1,
              }}
            >
              <Button onClick={onCopyAll}>
                <ClipboardIcon color="white" />
              </Button>
              <Button onClick={onSave}>
                <SaveIcon color="white" />
              </Button>
            </Stack>
            <Stack
              direction="column"
              css={{
                gap: 1,
                height: 300,
                width: '100%',
                overflow: 'auto',
              }}
            >
              {data.map((p, idx) => (
                <Text
                  css={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  {idx + 1} -
                  <ButtonLink
                    onClick={(e) => {
                      copy(e.currentTarget.innerHTML);
                      toasts.add({
                        text: `${idx + 1} copied to clipboard`,
                        type: 'success',
                      });
                    }}
                  >
                    {p}
                  </ButtonLink>
                </Text>
              ))}
            </Stack>
          </>
        )}
      </Stack>
    </>
  );
};

export default Generator;
