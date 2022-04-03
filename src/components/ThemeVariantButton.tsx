import { Moon as MoonIcon, Sun as SunIcon } from 'react-feather';

import { styled } from '@/styles';
import useThemeVariant from '@/styles/useThemeVariant';

import Button from './Button';

const StyledButton = styled(Button, {
  position: 'absolute',
  top: 16,
  ml: 4,
  size: 6,
});

const ThemeVariantButton = () => {
  const themeVariant = useThemeVariant();
  return (
    <StyledButton
      variant="rounded"
      onClick={() =>
        themeVariant.handlers.changeTheme((x) =>
          x === 'dark' ? 'default' : 'dark'
        )
      }
    >
      {themeVariant.themeVariant === 'default' ? (
        <MoonIcon color="white" />
      ) : (
        <SunIcon color="white" />
      )}
    </StyledButton>
  );
};

export default ThemeVariantButton;
