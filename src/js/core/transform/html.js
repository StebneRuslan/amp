import { Helper } from '../helper'
import Subject from './subject'

import {
    addClass,
    getTransform,
    parseMatrix,
    getOffset
} from '../util/css-util'

import {
    snapToGrid,
    snapCandidate,
    rotatedTopLeft,
    toPX,
    fromPX,
    getUnitDimension,
    floatToFixed, getRotatedPoint
} from './common'

const brackets = '<div class="dg-hdl dg-rotator"></div>\
        <div class="dg-hdl dg-hdl-t dg-hdl-l dg-hdl-tl"></div>\
        <div class="dg-hdl dg-hdl-t dg-hdl-r dg-hdl-tr"></div>\
        <div class="dg-hdl dg-hdl-b dg-hdl-r dg-hdl-br"></div>\
        <div class="dg-hdl dg-hdl-b dg-hdl-l dg-hdl-bl"></div>\
        <div class="dg-hdl dg-hdl-t dg-hdl-c dg-hdl-tc"></div>\
        <div class="dg-hdl dg-hdl-b dg-hdl-c dg-hdl-bc"></div>\
        <div class="dg-hdl dg-hdl-m dg-hdl-l dg-hdl-ml"></div>\
        <div class="dg-hdl dg-hdl-m dg-hdl-r dg-hdl-mr"></div>';
export default class Draggable extends Subject {
    
    constructor(el, options, Observable) {
        
        window.parent.addEventListener('message', handleLayerLock)
        super(el, Observable);
        this.enable(options);
    }
    
    _init(item, options) {
        _init.call(this, item, options);
    }
    
    _destroy(item) {
        _destroy.call(this, item);
    }
    
    _drag() {
        processMove.call(this, ...arguments);
    }
    
    _rotate() {
        processRotate.call(this, ...arguments);
    }
    
    _resize() {
        processResize.call(this, ...arguments);
    }
    
    _compute() {
        return _compute.call(this, ...arguments);
    }
    
    _apply() {
        window.parent.postMessage({ event: 'apply-from-iframe' }, 'http://127.0.0.1:3978/#/edit');
        const {
            storage,
            el
        } = this;
        
        const _el = Helper(el);
        
        const {
            cached,
            parent,
            dimens,
            handle,
            controls
        } = storage;
        
        if (!cached) return;
        
        const matrix = [...cached];
        
        const diffLeft = matrix[4];
        const diffTop = matrix[5];
        
        // matrix[4] = 0;
        // matrix[5] = 0;
        
        const css = matrixToCSS(matrix);
        
        const pW = parent.css('width'),
          pH = parent.css('height');
        
        const left = parseFloat(
          toPX(_el.css('left'), pW)
        );
        const top = parseFloat(
          toPX(_el.css('top'), pH)
        );
        
        css.left = fromPX(
          left + diffLeft + 'px',
          pW,
          dimens.left
        );
        
        css.top = fromPX(
          top + diffTop + 'px',
          pH,
          dimens.top
        );
        
        const container = el.querySelector('.text-container');
        const isTextDrag = handle[0].classList.contains('dg-controls') || !container || (!handle[0].classList.contains('dg-hdl-ml') && !handle[0].classList.contains('dg-hdl-mr'))
        
        window.parent.postMessage({
            event: 'resize-on-mouseup', position: {
                width: controls.style.width,
                height: controls.style.height,
                diffLeft,
                diffTop
            },
            isTextDrag: isTextDrag
        }, 'http://127.0.0.1:3978/#/edit');
        this.storage.cached = null;
    }
    
    onRefreshState(data) {
        const store = this.storage;
        
        const recalc = refreshState.call(this,
          data.factor,
          data.revX,
          data.revY
        );
        
        Object.keys(recalc).forEach(key => {
            store[key] = recalc[key];
        });
    }
}

let locked = true;
let dissableX = false;
let dissableY = false;
let savedLeft = 0;
let savedTop = 0;

function handleLayerLock (event) {
    if (event.data.event === 'set-lock-settings') {
        locked = event.data.locked;
    }
}

function _init(sel) {
    const wrapper = document.createElement('div');
    
    addClass(wrapper, 'dg-wrapper');
    sel.parentNode.insertBefore(wrapper, sel);
    
    const container = wrapper;
    const _sel = Helper(sel);
    
    const w = _sel.css('width'),
      h = _sel.css('height'),
      t = _sel.css('top'),
      l = _sel.css('left');
    
    const _parent = Helper(container.parentNode);
    
    const css = {
        top: t,
        left: l,
        width: toPX(w, _parent.css('width')),
        height: toPX(h, _parent.css('height')),
        transform: getTransform(_sel)
    };
    
    const controls = document.createElement('div');
    const guidlines = {
        screenCenterX: document.querySelector('.guid-line.guid-line-x.center-x'),
        screenCenterY: document.querySelector('.guid-line.guid-line-y.center-y'),
        centerX: document.querySelector('.guid-line.guid-line-y.guid-center-y'),
        centerY: document.querySelector('.guid-line.guid-line-x.guid-center-x'),
        left: document.querySelector('.guid-line.guid-line-y.guid-left'),
        right: document.querySelector('.guid-line.guid-line-y.guid-right'),
        top: document.querySelector('.guid-line.guid-line-x.guid-top'),
        bottom: document.querySelector('.guid-line.guid-line-x.guid-bottom')
    }
    const activeElement = document.querySelector('.dg-wrapper + .rotate-wrapper');
    const activeElementConfig = activeElement.getBoundingClientRect();
    const coordinates = [].map.call(document.querySelectorAll('.rotate-wrapper'), element => {
        if (activeElement !== element) {
            const config = element.getBoundingClientRect();
            return {
                left: parseInt(config.left),
                top: parseInt(config.top),
                right: parseInt(config.right),
                bottom: parseInt(config.bottom),
                centerX: parseInt(config.left + config.width / 2),
                centerY: parseInt(config.top + config.height / 2)
            }
        }
    }).filter(config => config);
    const activeElementCoordinates = {
        left: parseInt(activeElementConfig.left),
        top: parseInt(activeElementConfig.top),
        right: parseInt(activeElementConfig.right),
        bottom: parseInt(activeElementConfig.bottom),
        centerX: parseInt(activeElementConfig.left + activeElementConfig.width / 2),
        centerY: parseInt(activeElementConfig.top + activeElementConfig.height / 2)
    }
    const screenCenterX = document.body.clientWidth / 2;
    controls.innerHTML = brackets;
    
    addClass(controls, 'dg-controls');
    
    container.appendChild(controls);
    
    const _controls = Helper(controls);
    _controls.css(css);
    
    const _container = Helper(container);
    
    Object.assign(this.storage, {
        controls: controls,
        guidlines: guidlines,
        coordinates: coordinates,
        screenCenterX: screenCenterX,
        activeElementCoordinates: activeElementCoordinates,
        activeElement: document.querySelector('.dg-wrapper + .rotate-wrapper'),
        handles: {
            tl: _container.find('.dg-hdl-tl'),
            tr: _container.find('.dg-hdl-tr'),
            br: _container.find('.dg-hdl-br'),
            bl: _container.find('.dg-hdl-bl'),
            tc: _container.find('.dg-hdl-tc'),
            bc: _container.find('.dg-hdl-bc'),
            ml: _container.find('.dg-hdl-ml'),
            mr: _container.find('.dg-hdl-mr'),
            rotator: _container.find('.dg-rotator')
        },
        parent: _parent
    });
    _controls.on('mousedown', this._onMouseDown)
      .on('touchstart', this._onTouchStart);
    const textContainer = _sel[0].querySelector('.text-container');
    if (textContainer) {
        _container.find('.dg-hdl-bc')[0].style.display = 'none';
        _container.find('.dg-hdl-tc')[0].style.display = 'none';
    }
}

function _destroy() {
    window.parent.removeEventListener(handleLayerLock)
    const { controls } = this.storage;
    
    Helper(controls).off('mousedown', this._onMouseDown)
      .off('touchstart', this._onTouchStart);
    
    this.el.parentNode.removeChild(controls.parentNode);
}

function _compute(e) {
    window.parent.postMessage({ event: 'compute-from-iframe' }, 'http://127.0.0.1:3978/#/edit');
    const {
        el,
        storage
    } = this;
    
    const {
        handles,
        controls: ctrls,
        parent,
        snap
    } = storage;
    
    const handle = Helper(e.target);
    const container = el.querySelector('.text-container');
    const leftSide = handle[0].classList.contains('dg-hdl-ml');
    const rightSide = handle[0].classList.contains('dg-hdl-mr');
    if (container && !leftSide && !rightSide) {
        container.style.width = `${el.clientWidth}px`;
    }
    let factor = 1;
    
    //reverse axis
    const revX = handle.is(handles.tl) ||
      handle.is(handles.ml) ||
      handle.is(handles.bl) ||
      handle.is(handles.tc);
    
    const revY = handle.is(handles.tl) ||
      handle.is(handles.tr) ||
      handle.is(handles.tc) ||
      handle.is(handles.ml);
    
    //reverse angle
    if (handle.is(handles.tr) ||
      handle.is(handles.bl)
    ) {
        factor = -1;
    }
    
    const tl_off = getOffset(handles.tl[0]),
      tr_off = getOffset(handles.tr[0]);
    
    const refang = Math.atan2(
      tr_off.top - tl_off.top,
      tr_off.left - tl_off.left
    ) * factor;
    
    const cw = parseFloat(
      toPX(ctrls.style.width, parent.css('width'))
    );
    const ch = parseFloat(
      toPX(ctrls.style.height, parent.css('height'))
    );
    
    const transform = parseMatrix(Helper(ctrls));
    //getting current coordinates considering rotation angle
    const coords = rotatedTopLeft(
      transform[4],
      transform[5],
      cw,
      ch,
      refang,
      revX,
      revY
    );
    const offset_ = getOffset(ctrls);
    
    const center_x = offset_.left + cw / 2,
      center_y = offset_.top + ch / 2;
    
    const pressang = Math.atan2(
      e.pageY - center_y,
      e.pageX - center_x
    );
    
    const _el = Helper(el);
    const styleList = el.style;
    
    const dimens = {
        top: getUnitDimension(styleList.top || _el.css('top')),
        left: getUnitDimension(styleList.left || _el.css('left')),
        width: getUnitDimension(styleList.width || _el.css('width')),
        height: getUnitDimension(styleList.height || _el.css('height'))
    };
    
    const parentTransform = parseMatrix(parent);
    
    return {
        parentScale: [parentTransform[0], parentTransform[3]],
        transform,
        cw,
        ch,
        center: {
            x: center_x,
            y: center_y
        },
        left: snapCandidate(transform[4], snap.x),
        top: snapCandidate(transform[5], snap.y),
        coordY: coords.top,
        coordX: coords.left,
        factor,
        pressang,
        refang,
        revX,
        revY,
        handle,
        onTopEdge: handle.is(handles.tl) || handle.is(handles.tc) || handle.is(handles.tr),
        onLeftEdge: handle.is(handles.tl) || handle.is(handles.ml) || handle.is(handles.bl),
        onRightEdge: handle.is(handles.tr) || handle.is(handles.mr) || handle.is(handles.br),
        onBottomEdge: handle.is(handles.br) || handle.is(handles.bc) || handle.is(handles.bl),
        dimens
    }
}

function refreshState(factor, revX, revY) {
    
    const {
        controls: ctrls,
        handles,
        parent,
        snap
    } = this.storage;
    
    const tl_off = getOffset(handles.tl[0]),
      tr_off = getOffset(handles.tr[0]);
    
    const refang = Math.atan2(
      tr_off.top - tl_off.top,
      tr_off.left - tl_off.left
    ) * factor;
    
    const cw = parseFloat(
      toPX(ctrls.style.width, parent.css('width'))
    );
    const ch = parseFloat(
      toPX(ctrls.style.height, parent.css('height'))
    );
    
    const transform = parseMatrix(Helper(ctrls));
    
    //getting current coordinates considering rotation angle
    const coords = rotatedTopLeft(
      transform[4],
      transform[5],
      cw,
      ch,
      refang,
      revX,
      revY
    );
    
    const _sel = Helper(this.el);
    const styleList = this.el.style;
    return {
        transform: transform,
        parentTransform: parseMatrix(parent),
        left: snapCandidate(transform[4], snap.x),
        top: snapCandidate(transform[5], snap.y),
        coordX: coords.left,
        coordY: coords.top,
        refang: refang,
        cw: cw,
        ch: ch,
        dimens: {
            top: getUnitDimension(styleList.top || _sel.css('top')),
            left: getUnitDimension(styleList.left || _sel.css('left')),
            width: getUnitDimension(styleList.width || _sel.css('width')),
            height: getUnitDimension(styleList.height || _sel.css('height'))
        }
    }
}

function processResize(
  width,
  height,
  revX,
  revY
) {
    
    const {
        el,
        storage
    } = this;
    
    const {
        controls,
        handle,
        snap,
        left,
        top,
        coordX,
        coordY,
        refang,
        dimens,
        parent,
        transform
    } = storage;
    
    
    const { style } = controls;
    
    if (width !== null) {
        style.width = `${snapToGrid(width, snap.x)}px`;
    }
    
    const canResizeWithShiftKey = handle[0].classList.contains('dg-hdl-br') ||
      handle[0].classList.contains('dg-hdl-tr') ||
      handle[0].classList.contains('dg-hdl-bl') ||
      handle[0].classList.contains('dg-hdl-tl');
    let isText = false;
    const container = el.querySelector('.text-container');
    if (container && canResizeWithShiftKey) {
        isText = true;
    }
    const scaleHeight = storage.ch / storage.cw;
    if (height !== null) {
        console.log()
        if (((!storage.shiftKey && locked) || isText) && canResizeWithShiftKey) {
            height = width * scaleHeight;
        }
        style.height = `${snapToGrid(height, snap.y)}px`;
    }
    
    if (container && (handle[0].classList.contains('dg-hdl-mr') || handle[0].classList.contains('dg-hdl-ml'))) {
        let newHeight = 0;
        [].forEach.call(container.querySelectorAll('.simple-text-line'), (el) => {
            newHeight += el.clientHeight || el.offsetHeight;
        })
        style.height = !newHeight ? `${snapToGrid(container.parentNode.clientHeight, snap.y)}px` : `${snapToGrid(newHeight, snap.y)}px`;
    }
    
    const coords = rotatedTopLeft(
      left,
      top,
      style.width,
      style.height,
      refang,
      revX,
      revY
    );
    let resultY = top - (coords.top - coordY);
    let resultX = left - (coords.left - coordX);
    
    const matrix = [...transform];
    
    if (isText) {
        container.style.transformOrigin = `top left`;
        container.style.transform = `scale(${parseFloat(style.width) / storage.cw})`;
    }
    matrix[4] = resultX;
    matrix[5] = resultY;
    
    const css = matrixToCSS(matrix);
    
    Helper(controls).css(css);
    
    
    css.width = fromPX(
      style.width,
      parent.css('width'),
      dimens.width
    );
    
    css.height = fromPX(
      style.height,
      parent.css('height'),
      dimens.height
    );
    
    const size = {
        width: css.width,
        height: css.height,
    }
    
    
    Helper(el).css(css);
    window.parent.postMessage({ event: 'resize-from-package', size: size, isText: isText }, 'http://127.0.0.1:3978/#/edit');
    storage.cached = matrix;
}

function processMove(
  top,
  left
) {
    const {
        el,
        storage
    } = this;
    
    const {
        controls,
        transform,
        snap
    } = storage;
    
    const matrix = [...transform];
    
    const props = {
        elDrag: el,
        elDragContainer: document.querySelector('body')
    }
    const activeElementClientRect = storage.activeElement.getBoundingClientRect();
    const activeElementConfig = {
        left: parseInt(activeElementClientRect.left),
        top: parseInt(activeElementClientRect.top),
        right: parseInt(activeElementClientRect.right),
        bottom: parseInt(activeElementClientRect.bottom),
        centerX: parseInt(activeElementClientRect.left + activeElementClientRect.width / 2),
        centerY: parseInt(activeElementClientRect.top + activeElementClientRect.height / 2)
    };
    if (props.elDrag.name && props.elDrag.name.match('fullscreen')) {
        props.elDragClient = {
            left: Math.floor(+props.elDrag.name.split('/')[1]),
            right: Math.floor(+props.elDrag.name.split('/')[2]),
            top: Math.floor(+props.elDrag.name.split('/')[3]),
            bottom: Math.floor(+props.elDrag.name.split('/')[4])
        }
        if (props.elDragClient.left || Math.abs(Math.floor(props.elDragClient.right + 2)) - Math.floor(props.elDragContainer.clientWidth)) {
            if (left > 0 && props.elDragClient.left) {
                // need to optimize this
                if (Math.abs(props.elDragClient.left) > Math.abs(left)) {
                    matrix[4] = snapToGrid(transform[4] + Math.floor(left), snap.x);
                } else {
                    matrix[4] = snapToGrid(transform[4] + Math.abs(props.elDragClient.left), snap.x);
                }
            } else if (left <= 0 && Math.floor(props.elDragClient.right - 2) - Math.floor(props.elDragContainer.clientWidth)) {
                if ((Math.abs(Math.floor(props.elDragClient.right)) - Math.floor(props.elDragContainer.clientWidth)) - Math.abs(left) > 0) {
                    matrix[4] = snapToGrid(transform[4] + left, snap.x);
                } else {
                    matrix[4] = snapToGrid(transform[4] - (Math.abs(Math.floor(props.elDragClient.right)) - Math.floor(props.elDragContainer.clientWidth)), snap.x);
                }
            }
        }
        if (props.elDragClient.top) {
            if (top > 0 && props.elDragClient.top) {
                // need to optimize this
                if (Math.abs(props.elDragClient.top) > Math.abs(top)) {
                    matrix[5] = snapToGrid(transform[5] + Math.floor(top), snap.y);
                } else {
                    matrix[5] = snapToGrid(transform[5] + (Math.abs(props.elDragClient.top)), snap.y);
                }
            } else if (left <= 0 && Math.floor(props.elDragClient.bottom - 2) - Math.floor(props.elDragContainer.clientHeight)) {
                if ((Math.abs(Math.floor(props.elDragClient.bottom)) - Math.floor(props.elDragContainer.clientHeight)) - Math.abs(top) > 0) {
                    matrix[5] = snapToGrid(transform[5] + top, snap.y);
                } else {
                    matrix[5] = snapToGrid(transform[5] - (Math.abs(Math.floor(props.elDragClient.bottom)) - Math.floor(props.elDragContainer.clientHeight)), snap.y);
                }
            }
        }
        
    } else {
        // const bodyCenter = document.body.clientWidth / 2;
        // const verticalLines = (({left, right, centerX}) => ({left, right, centerX}))(activeElementConfig);
        // let stopDrag = false;
        // let diffX = 0;
        // let side = 'left';
        // for (let [key, value] of Object.entries(verticalLines)) {
        //     const localDiff = Math.abs(bodyCenter - value).toFixed(0);
        //     if (localDiff <= 20) {
        //         stopDrag = true;
        //         diffX = localDiff;
        //         side = bodyCenter - value >= 0 ? 'left' : 'right'
        //     }
        // }
        // if (stopDrag) {
        //     left -= side === 'right' ? diffX : -diffX;
        //     if (!savedLeft) {
        //         savedLeft = left;
        //     }
        //     dissableX = true;
        // }
        // if (Math.abs(left - savedLeft) > 50){
        //     savedLeft = 0;
        //     dissableX = false;
        // }
        
        matrix[4] = snapToGrid(transform[4] + handleGuideLines(storage, left, activeElementConfig), snap.x);
        // matrix[4] = snapToGrid(transform[4] + left, snap.x);
        matrix[5] = snapToGrid(transform[5] + top, snap.y);
        // matrix[5] = snapToGrid(transform[5] + handleGuideLines(storage, top, activeElementConfig), snap.y);
    }
    const css = matrixToCSS(matrix);
    
    Helper(controls).css(css);
    Helper(el).css(css);
    // handleGuideLines(storage, activeElementConfig);
    storage.cached = matrix;
}


const vertivalConfigFields = ['left', 'right', 'centerX']
const horizontalConfigFields = ['top', 'bottom', 'centerY']

let tmp = 0;
let stopDrag = false;

function approxeq(numbers, controlNumber, epsilon) {
    if (epsilon == null) {
        epsilon = 10;
    }
    return Array.from(numbers).find(number => Math.abs(number - controlNumber) < epsilon)
};

function getGuidlinesConfig(elenentPositions, activeElemetPosition, screenCenterX) {
    const config = {
        left: false,
        centerX: false,
        right: false
    }
    let diffs = [];
    const leftSide = approxeq(elenentPositions, activeElemetPosition.left)
    const centerElementSideX = approxeq(elenentPositions, activeElemetPosition.centerX)
    const rightSide = approxeq(elenentPositions, activeElemetPosition.right)
    
    if (leftSide) {
        config.left = true;
        diffs.push(leftSide - activeElemetPosition.left);
    }
    if (centerElementSideX) {
        config.centerX = true;
        diffs.push(centerElementSideX - activeElemetPosition.centerX);
    }
    if (rightSide) {
        config.right = true;
        diffs.push(rightSide - activeElemetPosition.right);
    }
    return {
        config: config,
        diff: Math.min.apply(null, diffs)
    };
}

const guidLinesConfig = {
    stopDragX: false,
    tempPositionX: 0
}

function getArrayOfCoorditates(coordinates, center) {
    let res = [center];
    coordinates.map(element => {
        res = res.concat(Object.values((({left, right, centerX}) => ({left, right, centerX}))(element)))
    })
    return res;
}

function handleGuideLines (storage, position, activeElementConfig) {
    // console.log('getArrayOfCoorditates', getArrayOfCoorditates(storage.coordinates));
    // (storage.coordinates).concat({ left: storage.screenCenterX, right: storage.screenCenterX, centerX: storage.screenCenterX }).map(line => {
    //     const vertical = (({left, right, centerX}) => ({left, right, centerX}))(line);
    const linesConfig = getGuidlinesConfig(getArrayOfCoorditates(storage.coordinates, storage.screenCenterX), activeElementConfig);
    for (let [key, value] of Object.entries(linesConfig.config)) {
        if (value) {
            storage.guidlines[key].style.display = 'block';
            storage.guidlines[key].style.left = `${activeElementConfig[key]}px`;
        } else {
            storage.guidlines[key].style.display = 'none';
        }
    }
    if (Object.values(linesConfig.config).includes(true) && !guidLinesConfig.stopDragX && !guidLinesConfig.tempPositionX) {
        guidLinesConfig.stopDragX = true;
        console.log(linesConfig.diff)
        position += linesConfig.diff;
        guidLinesConfig.tempPositionX = position;
    } else if (Math.abs(position - guidLinesConfig.tempPositionX) >= 20) {
        guidLinesConfig.stopDragX = false;
        guidLinesConfig.tempPositionX = false;
    }
    // } else {
    //     storage.guidlines[key].style.display = 'none';
    // }
    // const diff = +Math.abs(activeElementConfig.left - value).toFixed(0);
    // if (diff && diff <= 20 && !stopDrag && !tmp) {
    //     position -= diff;
    //     tmp = position;
    //     stopDrag = true;
    //     if (key !== 'centerX' && key !== 'centerY') {
    //         storage.guidlines[key].style.display = 'block';
    //         storage.guidlines[key].style.left = `${line[key]}px`;
    //     }
    // }
    // if (Math.abs(tmp - position) >= 20) {
    //     if (key !== 'centerX' && key !== 'centerY') {
    //         storage.guidlines[key].style.display = 'none';
    //     }
    //     tmp = 0;
    //     stopDrag = false;
    // }
    // }
    // })
    return !guidLinesConfig.stopDragX ? position : guidLinesConfig.tempPositionX;
}
function handleCenterGuideLines (position, activeElementConfig, firstSide, secondSide) {
    const bodyCenter = firstSide === 'left' ? (document.body.clientWidth / 2) : (document.body.clientHeight / 2);
    const lines = firstSide === 'left' ? (({left, right, centerX}) => ({left, right, centerX}))(activeElementConfig) : (({top, bottom, centerY}) => ({top, bottom, centerY}))(activeElementConfig);
    let stopDrag = false;
    let diff = 0;
    let side = firstSide;
    for (let [key, value] of Object.entries(lines)) {
        const localDiff = Math.abs(bodyCenter - value).toFixed(0);
        if (localDiff <= 20) {
            stopDrag = true;
            diff = localDiff;
            side = bodyCenter - value >= 0 ? firstSide : secondSide
        }
    }
    if (stopDrag) {
        position -= side === secondSide ? diff : -diff;
        if (!savedLeft && firstSide === 'left') {
            savedLeft = position;
            dissableX = true;
        } else if (!savedTop && firstSide === 'top') {
            savedTop = position
            dissableY = true;
        }
    }
    if (Math.abs(position - savedLeft) > 50 && firstSide === 'left'){
        savedLeft = 0;
        dissableX = false;
    } else if (Math.abs(position - savedTop) > 50 && firstSide === 'top') {
        savedTop = 0;
        dissableY = false;
    }
    return firstSide === 'left' ? (!dissableX ? position : savedLeft) : (!dissableY ? position : savedTop)
}



// function handleGuideLines(storage, activeElementConfig) {
// console.log('clientHeight', document.body.clientHeight / 2);
// console.log('clientWidth', document.body.clientWidth / 2);
// console.log((activeElementConfig.left + activeElementConfig.width / 2).toFixed(0));
// console.log('#', (activeElementConfig.left + activeElementConfig.width / 2).toFixed(0), document.body.clientWidth / 2);
// console.log('$', (activeElementConfig.left + activeElementConfig.width / 2).toFixed(0) === (document.body.clientWidth / 2).toFixed(0));
// if ((activeElementConfig.left + activeElementConfig.width / 2).toFixed(0) === (document.body.clientWidth / 2).toFixed(0)) {
//     storage.guidlines.centerY.style.display = 'block';
// } else if ((activeElementConfig.top + activeElementConfig.height / 2).toFixed(0) === (document.body.clientHeight / 2).toFixed(0)) {
//     storage.guidlines.centerX.style.display = 'block';
// } else {
// storage.guidlines.centerX.style.display = 'none';
// storage.guidlines.centerY.style.display = 'none';
// }
// }

function processRotate(radians) {
    
    const {
        el,
        storage
    } = this;
    
    const {
        controls,
        transform,
        refang,
        snap
    } = storage;
    
    const matrix = [...transform];
    
    const angle = snapToGrid(refang + radians, snap.angle);
    //rotate(Xdeg) = matrix(cos(X), sin(X), -sin(X), cos(X), 0, 0);
    matrix[0] = floatToFixed(Math.cos(angle));
    matrix[1] = floatToFixed(Math.sin(angle));
    matrix[2] = - floatToFixed(Math.sin(angle));
    matrix[3] = floatToFixed(Math.cos(angle));
    
    window.parent.postMessage({ event: 'rotate-from-resizer', value: angle * (180 / Math.PI) }, 'http://127.0.0.1:3978/#/edit');
    const css = matrixToCSS(matrix);
    
    Helper(controls).css(css);
    Helper(el).css(css);
    
    storage.cached = matrix;
}

function matrixToCSS(arr) {
    const style = `matrix(${arr.join()})`;
    
    return {
        transform: style,
        webkitTranform: style,
        mozTransform: style,
        msTransform: style,
        otransform: style
    }
}
