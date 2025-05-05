import { FRAMEWORK, KEY } from './constants';
import FrameworkSelectorDecorator from './FrameworkSelectorDecorator';

export const decorators = [FrameworkSelectorDecorator];
export const initialGlobals = {
    [KEY]: FRAMEWORK.REACT,
};
