import { styled } from '@/styles';

const Button = styled('button', {
  backgroundColor: '$primary',
  color: '$text',
  borderRadius: '$sm',
  border: 'none',
  p: 1,

  '&:hover': {
    backgroundColor: '$primary-dark',
  },
});

export const ButtonLink = styled(Button, {
  backgroundColor: 'transparent',

  '&:hover': {
    backgroundColor: 'transparent',
    textShadow: '$sm',
  },
});

export default Button;
