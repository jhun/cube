/** @see https://github.com/processing/p5.js/blob/master/src/math/calculation.js */
function map(n, start1, stop1, start2 = 0, stop2 = 1) {
    return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2
}
function constraint(n, min = 0, max = 1) {
    return Math.min(Math.max(n, min), max)
}

class VZArray extends Array {
    get last() {
        return (this.length < 1) ? undefined : this[this.length - 1]
    }
    get first() {
        return (this.length < 1) ? undefined : this[0]
    }
}

/**
 * @TODO inertia
 * @TODO get/set props from attrs
 */
class VZCubeElement extends HTMLElement {
    createdCallback() {
        this.initialR = { pitch: 0, yaw: 0 }
        this.currentR = { pitch: 0, yaw: 0 }
        this.eventStack = new VZArray()

        // elements
        this.pivot = this.querySelector('vz-cubepivot')

        // styles
        this.style.cursor = 'move'

        // events
        this._mouseDownListener = this._mouseDownListener.bind(this)
        this._mouseUpListener = this._mouseUpListener.bind(this)
        this._mouseMoveListener = this._mouseMoveListener.bind(this)
        this._touchStartListener = this._touchStartListener.bind(this)
        this._touchEndListener = this._touchEndListener.bind(this)
        this._touchMoveListener = this._touchMoveListener.bind(this)
        this._refresh = this._refresh.bind(this)

        this.addEventListener('mousedown', this._mouseDownListener)
        this.addEventListener('touchstart', this._touchStartListener, true)
        this.addEventListener('touchmove', this._touchMoveListener, true)
        this.addEventListener('touchend', this._touchEndListener, true)
        this.addEventListener('touchcancel', this._touchEndListener, true)
    }

    attachedCallback() {
        this._refresh()
    }

    detachedCallback() {
        (typeof cancelAnimationFrame === 'function')
            ? cancelAnimationFrame(this.refreshPointer)
            : clearTimeout(this.refreshPointer)
    }

    startInteraction() {
        Object.assign(this.initialR, this.currentR)
        this.eventStack = new VZArray()
    }

    addInteraction(interaction) {
        this.eventStack.push(interaction)
    }

    endInteraction() {}

    // ==============
    // event handlers
    // --------------

    // mouse

    _mouseDownListener(e) {
        window.addEventListener('mousemove', this._mouseMoveListener)
        window.addEventListener('mouseup', this._mouseUpListener)
        this.startInteraction()
    }

    _mouseUpListener(e) {
        window.removeEventListener('mousemove', this._mouseMoveListener)
        window.removeEventListener('mouseup', this._mouseUpListener)
        this.endInteraction()
    }

    _mouseMoveListener(e) {
        this.addInteraction({ x: e.pageX, y: e.pageY, t: e.timeStamp })
    }

    // touch

    _touchStartListener(e) {
        this.startInteraction()
    }

    _touchEndListener(e) {
        this.endInteraction()
    }

    _touchMoveListener(e) {
        e.preventDefault()
        this.addInteraction({ x: e.touches[0].pageX, y: e.touches[0].pageY, t: e.timeStamp })
    }

    // =========
    // animation
    // ---------

    _refresh () {
        if (this.eventStack.length >= 2 && this.pivot) {
            // calculate deltas of this interaction
            let deltaX = (this.eventStack.last.x - this.eventStack.first.x) * -0.2 // side-to-side movement
            let deltaY = (this.eventStack.last.y - this.eventStack.first.y) * 0.2 // up-down movement

            // apply deltas to the initial R of this interaction
            this.currentR.yaw   = this.initialR.yaw + deltaY, -90, 90 // constraint rotation arount X axis (yaw)
            this.currentR.pitch = this.initialR.pitch + deltaX

            // apply current R to the pivot element
            let perspective = parseInt(window.getComputedStyle(this).perspective)

            this.pivot.style.transform = `translateZ(${perspective}px) rotateX(${this.currentR.yaw}deg) rotateY(${this.currentR.pitch}deg)`
        }

        // recurse
        this.refreshPointer = (typeof cancelAnimationFrame === 'function')
            ? requestAnimationFrame(this._refresh)
            : setTimeout(this._refresh, 1000/60)
    }
}
document.registerElement('vz-cube', VZCubeElement)
