export const errorToMessage = (errorKey: string, errorData: any, fieldName?: string) => {
  const aFieldName = fieldName ? fieldName : 'this field';
  switch(errorKey) {
    case 'required':
      return `Value for ${aFieldName} is required.`;
    case 'maxlength':
      return `Value for ${aFieldName} is ${errorData.actualLength} which exceeds ${errorData.requiredLength} limit.`;
    case 'minlength':
      return `Value for ${aFieldName} is ${errorData.actualLength}, but the field should be  ${errorData.requiredLength} chars long at least.`;
  }
  return '';
};
