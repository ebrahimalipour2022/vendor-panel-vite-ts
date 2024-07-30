export const ensurePrefix = (str: string, prefix: string) =>
  str.startsWith(prefix) ? str : `${prefix}${str}`;
export const withoutSuffix = (str: string, suffix: string) =>
  str.endsWith(suffix) ? str.slice(0, -suffix.length) : str;
export const withoutPrefix = (str: string, prefix: string) =>
  str.startsWith(prefix) ? str.slice(prefix.length) : str;

export const toPersianNum = (content: string | number) => {
  let persianContent = '';

  if (content) {
    content = content.toString();

    for (let i = 0; i < content.length; i++) {
      switch (content.charAt(i)) {
        case '0':
          persianContent += '۰';
          break;
        case '1':
          persianContent += '۱';
          break;
        case '2':
          persianContent += '۲';
          break;
        case '3':
          persianContent += '۳';
          break;
        case '4':
          persianContent += '۴';
          break;
        case '5':
          persianContent += '۵';
          break;
        case '6':
          persianContent += '۶';
          break;
        case '7':
          persianContent += '۷';
          break;
        case '8':
          persianContent += '۸';
          break;
        case '9':
          persianContent += '۹';
          break;
        default:
          persianContent += content.charAt(i);
          break;
      }
    }

    return persianContent;
  }
  if (content === 0 || content === '0') {
    return persianContent + '۰';
  }

  return persianContent;
};

export const toEnglishNum = (content: string | number) => {
  let englishContent = '';

  if (content) {
    content = content.toString();

    for (let i = 0; i < content.length; i++) {
      switch (content.charAt(i)) {
        case '۰':
          englishContent += '0';
          break;
        case '۱':
          englishContent += '1';
          break;
        case '۲':
          englishContent += '2';
          break;
        case '۳':
          englishContent += '3';
          break;
        case '۴':
          englishContent += '4';
          break;
        case '۵':
          englishContent += '5';
          break;
        case '۶':
          englishContent += '6';
          break;
        case '۷':
          englishContent += '7';
          break;
        case '۸':
          englishContent += '8';
          break;
        case '۹':
          englishContent += '9';
          break;
        default:
          englishContent += content.charAt(i);
          break;
      }
    }

    return englishContent;
  }
  if (content === 0 || content === '۰') {
    return englishContent + '0';
  }

  return englishContent;
};

export const normalizeContent = (content: string | number, type: string) => {
  // const lang = getLang();
  const lang = 'fa';

  if (!content) {
    return '';
  }

  if (type === 'in') {
    if (lang === 'fa') {
      return toPersianNum(content);
    }
    return toEnglishNum(content);
  }
};
