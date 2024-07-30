export const getFileExtensionWithDot = (filename: any) => {
  if (filename) {
    const re = /(?:\.([^.]+))?$/;

    return re.exec(filename);
  }
};

export const validateFileType = (file: any, valid_types: any) => {
  if (file) {
    const validTypes = valid_types; // [ 0.".png", 1:".jpg" , ... ]
    // @ts-ignore
    const fileType = getFileExtensionWithDot(file.name)[0];

    if (validTypes?.length) {
      return validTypes.indexOf(fileType.toLowerCase()) !== -1;
    }
  }

  return false;
};

export const validateFileSize = (file: { size: number }, valid_size: number) => {
  let validate = false;

  if (file) {
    if (valid_size) {
      validate = file.size <= valid_size;
    }
  }

  return validate;
};

export const roundDown = (n: number, decimals: number = 0) => {
  const multiplier = 10 ** decimals;

  return Math.floor(n * multiplier) / multiplier;
};

export const isNumeric = (number: string | number) => {
  try {
    const regex = new RegExp('^[0-9]*$');

    return !isNaN(Number(number)) && regex.test(String(number));
  } catch (e) {
    return false;
  }
};

export const imageSizeNormalize = (value: number, t: any) => {
  if (!isNumeric(value)) {
    return value;
  }

  if (value > 1073741824) {
    return `${roundDown(value / 1073741824, 1)} ${t('common.GByte')}`;
  }

  if (value > 1048576) {
    return `${roundDown(value / 1048576, 1)} ${t('common.MByte')}`;
  }

  if (value > 1024) {
    return `${roundDown(value / 1024, 1)} ${t('common.KByte')}`;
  }

  return `${value} ${t('common.Byte')}`;
};

export const formatsListNormalizer = (valueList: any[], separator: string, withDot = false) => {
  let newValue = '';
  const valueListLength = valueList.length;
  let i = 1;

  valueList.forEach((value) => {
    if (!withDot) {
      value = value.replace('.', '');
    }

    if (i >= valueListLength) {
      newValue += value;
    } else {
      newValue += value + ` ${separator} `;
    }

    i += 1;
  });

  return newValue;
};
