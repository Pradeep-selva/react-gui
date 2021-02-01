import { propTypes } from '../../configs';
import type { IPayload } from '../../types';

export default (payload: IPayload): string => {
  const {
    componentName,
    fileName,
    fileType,
    location,
    props,
    states,
    initPropTypes
  } = payload;
  if (!componentName) {
    return 'Enter a component name to create it.';
  }

  if (location === 'new' && !fileName) {
    return 'You must enter a file name to create component.';
  }

  if (
    fileType === 'js' &&
    initPropTypes &&
    !props.every(
      prop =>
        !prop ||
        prop?.type.split('.').every(type => propTypes.includes(type || '')) ||
        prop?.type.includes('Of')
    )
  ) {
    return 'Some of the entered prop types are not valid. Leave the type field empty to use default value.';
  }

  if (fileType === 'ts') {
    const isPropInvalid = props.some(prop => !prop?.type && !!prop?.name);
    const isStateInvalid = states.some(state => !state?.type && !!state?.name);

    if (isPropInvalid || isStateInvalid) {
      return 'You must specify types for every prop/state for a TSX component';
    }
  }

  return '';
};
