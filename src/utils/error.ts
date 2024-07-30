export function getNormalizedErrorMessage(json: any): string | undefined {
  if (typeof json === 'string') {
    return json;
  }

  if (Array.isArray(json)) {
    for (const value of json) {
      const nestedResult = getNormalizedErrorMessage(value);

      if (nestedResult) {
        return nestedResult;
      }
    }
  } else if (typeof json === 'object' && json !== null) {
    for (const key in json) {
      if (json.hasOwnProperty(key)) {
        const value = json[key];
        const nestedResult = getNormalizedErrorMessage(value);

        if (nestedResult) {
          return nestedResult;
        }
      }
    }
  }

  return undefined;
}
