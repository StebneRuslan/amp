/* @license
 * Move/Rotate/Resize tool
 * Released under the MIT license, 2018-2019
 * nichollascarter@gmail.com
*/

import '../style/subjx.css'
import _drag from './core/transform/index'
import { Helper_ } from './core/helper'

class Subjx extends Helper_ {

    constructor(params) {
        super(params);
    }

    drag(method) {
        return _drag.call(this, method);
    }
}

export default function(params) {
    return new Subjx(params);
}