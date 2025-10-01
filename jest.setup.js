import '@testing-library/jest-dom';
import 'intersection-observer';
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

window.scrollTo = jest.fn();
