/** @see https://github.com/processing/p5.js/blob/master/src/math/calculation.js */
function map(n, start1, stop1, start2 = 0, stop2 = 1) {
    return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2
}
function constraint(n, min = 0, max = 1) {
    return Math.min(Math.max(n, min), max)
}

function head(ls) { return ls[0] }
function tail(ls) { return ls.slice(1) }
function init(ls) { return ls.slice(0, -1) }
function last(ls) { return ls[ls.length - 1] }



class VZCubeElement extends HTMLElement {
    createdCallback() {
        this.isAnimating    = false
        this._isDragging     = false

        this.yaw    = 0
        this.pitch  = 0

        this._handleMouseDown   = this._handleMouseDown.bind(this)
        this._handleMouseMove   = this._handleMouseMove.bind(this)
        this._handleMouseUp     = this._handleMouseUp.bind(this)
        this._handleTouchStart  = this._handleTouchStart.bind(this)
        this._handleTouchMove   = this._handleTouchMove.bind(this)
        this._handleTouchEnd    = this._handleTouchEnd.bind(this)
        this._refresh           = this._refresh.bind(this)
    }

    attachedCallback() {
        this._pivot = this.querySelector('vz-cubepivot')
        this._addEventHandlers()
        this._refresh()
    }

    detachedCallback() {
        typeof cancelAnimationFrame === 'function'
            ? cancelAnimationFrame(this._refreshId)
            : clearTimeout(this._refreshId)
        this._removeEventHandlers()
    }

    _addEventHandlers() {
        this.addEventListener('mousedown', this._handleMouseDown)
        window.addEventListener('mousemove', this._handleMouseMove)
        window.addEventListener('mouseup', this._handleMouseUp)
        this.addEventListener('touchstart', this._handleTouchStart)
        this.addEventListener('touchmove', this._handleTouchMove)
        this.addEventListener('touchend', this._handleTouchEnd)
        this.addEventListener('touchcancel', this._handleTouchEnd)
    }

    _removeEventHandlers() {
        this.removeEventListener('mousedown', this._handleMouseDown)
        window.removeEventListener('mousemove', this._handleMouseMove)
        window.removeEventListener('mouseup', this._handleMouseUp)
        this.removeEventListener('touchstart', this._handleTouchStart)
        this.removeEventListener('touchmove', this._handleTouchMove)
        this.removeEventListener('touchend', this._handleTouchEnd)
        this.removeEventListener('touchcancel', this._handleTouchEnd)
    }

    _handleMouseDown(e) {
        this._isDragging = true
        this._lastDragEvent = e
    }

    _handleMouseMove(e) {
        if (!this._isDragging) return

        this.yaw    += (this._lastDragEvent.pageX - e.pageX) * 0.1
        this.pitch  -= -(this._lastDragEvent.pageY - e.pageY) * 0.1

        this._lastDragEvent = e
    }

    _handleMouseUp(e) {
        this._isDragging = false
    }

    _handleTouchStart(e) {
        this._isDragging = true
        this._lastDragEvent = e.touches[0]
    }

    _handleTouchMove(e) {
        if (!this._isDragging) return

        this.yaw    += (this._lastDragEvent.pageX - e.touches[0].pageX) * 0.1
        this.pitch  -= (this._lastDragEvent.pageY - e.touches[0].pageY) * 0.1

        this._lastDragEvent = e.touches[0]
    }

    _handleTouchEnd(e) {
        this._isDragging = false
    }


    _refresh() {
        const perspective = getComputedStyle(this).perspective

        this._pivot.style.transform = `translateZ(${perspective}) rotateX(${this.pitch}deg) rotateY(${this.yaw}deg)`

        // recurse
        this._refreshId = typeof requestAnimationFrame === 'function'
            ? requestAnimationFrame(this._refresh)
            : setTimeout(this._refresh, 1000/30)
    }
}

document.registerElement('vz-cube', VZCubeElement)
