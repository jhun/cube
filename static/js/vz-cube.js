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
        this._isAnimating   = false
        this._isDragging    = false
        this._isFrozen      = false

        this._draggingMultiplier = 0.1

        this.yaw    = 0
        this.pitch  = 0

        this._handleMouseDown   = this._handleMouseDown.bind(this)
        this._handleMouseMove   = this._handleMouseMove.bind(this)
        this._handleMouseUp     = this._handleMouseUp.bind(this)
        this._handleTouchStart  = this._handleTouchStart.bind(this)
        this._handleTouchMove   = this._handleTouchMove.bind(this)
        this._handleTouchEnd    = this._handleTouchEnd.bind(this)
        this._processAnimation  = this._processAnimation.bind(this)
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

    animateTo(yaw, pitch, duration = 1000, callback = null) {
        this._isAnimating = true
        this._animationStartPos     = { yaw: this.yaw, pitch: this.pitch }
        this._animationEndPos       = { yaw: parseFloat(yaw) || 0, pitch: parseFloat(pitch) || 0 }
        this._animationStartTime    = Date.now()
        this._animationEndTime      = Date.now() + duration
        this._animationEndCallback  = callback
    }

    freeze() {
        this._isFrozen = true
    }

    unfreeze() {
        this._isFrozen = false
    }

    zoomIn() {
        this.setAttribute('zoom', true)
    }
    zoomOut() {
        this.removeAttribute('zoom')
    }

    _easing(t) {
        return t<.5 ? 2*t*t : -1+(4-2*t)*t
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
        if (!this._isDragging || this._isAnimating || this._isFrozen) return

        this.yaw    += (this._lastDragEvent.pageX - e.pageX) * this._draggingMultiplier
        this.pitch  -= constraint((this._lastDragEvent.pageY - e.pageY) * this._draggingMultiplier, -70, 70)

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
        if (!this._isDragging || this._isAnimating || this._isFrozen) return

        this.yaw    += (this._lastDragEvent.pageX - e.touches[0].pageX) * this._draggingMultiplier
        this.pitch  -= (this._lastDragEvent.pageY - e.touches[0].pageY) * this._draggingMultiplier

        this._lastDragEvent = e.touches[0]
    }

    _handleTouchEnd(e) {
        this._isDragging = false
    }

    _processAnimation() {
        if (!this._isAnimating) return

        const now = Date.now()
        const t = map(now, this._animationStartTime, this._animationEndTime, 0, 1)

        this.yaw    = map(this._easing(t), 0, 1, this._animationStartPos.yaw, this._animationEndPos.yaw)
        this.pitch  = map(this._easing(t), 0, 1, this._animationStartPos.pitch, this._animationEndPos.pitch)

        if (this._animationEndTime <= now) {
            this._isAnimating   = false
            this.yaw            = this._animationEndPos.yaw
            this.pitch          = this._animationEndPos.pitch

            if (typeof this._animationEndCallback === 'function') {
                requestAnimationFrame(_ => this._animationEndCallback.call(this))
            }
        }
    }

    _refresh() {
        this._processAnimation()

        const perspective = getComputedStyle(this).perspective

        this._pivot.style.transform = `translateZ(${perspective}) rotateX(${this.pitch}deg) rotateY(${this.yaw}deg)`

        // recurse
        this._refreshId = typeof requestAnimationFrame === 'function'
            ? requestAnimationFrame(this._refresh)
            : setTimeout(this._refresh, 1000/30)
    }
}

document.registerElement('vz-cube', VZCubeElement)



class VZCubeFeature extends HTMLAnchorElement {
    createdCallback() {
        this._yaw   = this.getAttribute('yaw')
        this._pitch = this.getAttribute('pitch')

        this._refresh = this._refresh.bind(this)
    }

    attachedCallback() {
        this._refresh()
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        switch (attrName) {
            case 'yaw':
                this._yaw = parseFloat(newVal) || 0; break
            case 'pitch':
                this._pitch = parseFloat(newVal) || 0; break
        }
    }

    _refresh() {
        this.style.transform = `rotateY(${-this.yaw}deg) rotateX(${this.pitch}deg) translateZ(50vmax - 1px)`
    }

    get yaw() {
        return this._yaw
    }
    get pitch() {
        return this._pitch
    }
}
document.registerElement('vz-cube-feature', {
    prototype: VZCubeFeature.prototype,
    extends: 'a'
});
