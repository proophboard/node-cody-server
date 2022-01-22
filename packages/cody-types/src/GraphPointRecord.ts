import { Record } from 'immutable';
import { GraphPoint } from './index';

export default class GraphPointRecord extends Record({ x: 0, y: 0 }) implements GraphPoint {}
