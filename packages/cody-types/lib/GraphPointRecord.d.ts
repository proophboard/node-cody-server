import { Record } from 'immutable';
import { GraphPoint } from './index';
declare const GraphPointRecord_base: Record.Factory<{
    x: number;
    y: number;
}>;
export default class GraphPointRecord extends GraphPointRecord_base implements GraphPoint {
}
export {};
