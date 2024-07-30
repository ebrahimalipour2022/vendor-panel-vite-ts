export const removeAllOccurrences = (string: string | number, find?: string) => {
  if (!string) {
    return '';
  }

  if (!find) {
    return string.toString();
  }

  return string.toString().split(find).join('');
};

export const numberWithCommas = (number?: number): string => {
  if (!number || number === 0) {
    return '0';
  }
  // if (number > MAX_NUMBER) {
  //   return i18n.t('formCommonErrors.invalidMaxNumber')
  // }

  return removeAllOccurrences(number).replace(/\B(?=(\d{3})+(?!\d))/g, '٬');
};
