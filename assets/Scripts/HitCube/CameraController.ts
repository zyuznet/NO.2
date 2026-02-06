import { _decorator, Component, EventTouch, Input, input, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CameraController')
export class CameraController extends Component {
    start() {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this)
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this)
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this)
    }
    onDestroy(): void {
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this)
        input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this)
        input.off(Input.EventType.TOUCH_END, this.onTouchEnd, this)
    }
    onTouchStart(event: EventTouch) {
        console.log('Touch start'+event.getLocation())
    }
    onTouchMove(event: EventTouch) {
        console.log('Touch move'+event.getLocation())
        console.log('Touch move'+event.getDelta()) 
        const scale = 0.05
        const pos = this.node.position
        this.node.setPosition(pos.x - event.getDeltaX()*scale, pos.y - event.getDeltaY()*scale, pos.z)
    }
    onTouchEnd(event: EventTouch) {
        console.log('Touch end'+event.getLocation())
    }
    update(deltaTime: number) {
        
    }
}


