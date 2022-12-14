let remove: () => void;
export const updatePrefersColorScheme = () => {
  if (remove != null) {
    remove();
  }
  const media = matchMedia('(prefers-color-scheme: dark)');
  media.addEventListener('change', updatePrefersColorScheme);
  remove = function () {
    media.removeEventListener('change', updatePrefersColorScheme);
  };

  if (media.matches) {
    document.body.setAttribute('cds-theme', 'dark');
  } else {
    document.body.setAttribute('cds-theme', '');
  }
  console.log('theme dark : ', media.matches);
};
