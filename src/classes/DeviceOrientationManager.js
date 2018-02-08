export default class DeviceOrientationManager {
    constructor (cube) {
        this.cube = cube
        this.orientation = window.orientation || 0
        this._handleDeviceOrientationInit = this._handleDeviceOrientationInit.bind(this)
        this._handleDeviceOrientation = this._handleDeviceOrientation.bind(this)
        this.initOrientationCompensate = true;
        this.initOrientation = 0;
    }

    init() {
        window.addEventListener('deviceorientation', this._handleDeviceOrientationInit)
        window.addEventListener('deviceorientation', this._handleDeviceOrientation)
    }

    deinit() {
        window.removeEventListener('deviceorientation', this._handleDeviceOrientation)
    }

    _isMobileDevice() {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    };

    _handleDeviceOrientationInit (e) {
        this.initOrientation = this._getOrientation(e);
        window.removeEventListener('deviceorientation', this._handleDeviceOrientationInit);
        if (this.initOrientation.y>=0 && this.initOrientation.y <=180 && this.initOrientationCompensate && this._isMobileDevice()){
            this.cube.pitch -= 90-this.initOrientation.y;
        }
        this.cube.yaw = this.initOrientation.x;
    }

    _handleDeviceOrientation (e) {
        const curr = this._getOrientation(e)
        const prev = this._previousOrientation

        // @FIXME s/x/y/g s/y/x/g
        if (prev !== undefined) {
            var difX = curr.x - prev.x
            var difY = curr.y - prev.y
            if ( Math.abs(difY) > 90 ){
                difX = 0
                difY = 0
            }
            this.cube.yaw   += difX
            this.cube.pitch  += difY
            // this.cube.roll    += curr.z - prev.z
        }
        
        this._previousOrientation =  curr
    }

    _getOrientation ({ alpha, beta, gamma }) {
        var frozen = window.frozen || false;
        if (!frozen){
            const orientation = window.orientation || 0

            var r = {
                x: -(alpha + gamma),
                y: beta,
            }

            switch (orientation) {
                case 90:
                    // landscape (left)
                    r = {
                        x: 90 - (alpha + beta),
                        y: -gamma,
                    }
                    break;
                case -90:
                    r = {
                        x: 90 - (alpha + beta),
                        y: gamma,
                    }
                    break;
                case 180:
                break;
                    // portrait (upside-down)
            }

            return r;
        }
    }
}
