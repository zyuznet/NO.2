import { _decorator, CCString, Component, EventTouch, Input, input, instantiate, Node, Prefab, RigidBody, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AttackController')
export class AttackController extends Component {
    
    @property(Prefab)
    public attackBullet:Prefab
    @property(Node)
    public bulletParent:Node
    @property
    public attackSpeed:number = 100
    private isTouching:boolean = false
    @property
    private fireRate:number = 0.2
    private fireTime:number = 0
    start() {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this)
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this)
    }

    onTouchStart(event: EventTouch) {
        this.isTouching = true
        // console.log('Touch Start'+event.getLocation())
    }
    onTouchEnd(event: EventTouch) {
        // console.log('Touch End'+event.getLocation())1
        this.isTouching = false
    }
    update(deltaTime: number) {
        if(this.isTouching) {
            this.fireTime+=deltaTime
            if(this.fireTime>=this.fireRate) {
                this.fire()
                this.fireTime = 0
            }
        }
    }
    fire() {
        const bullet = instantiate(this.attackBullet)
        bullet.setParent(this.bulletParent)
        // bullet.setPosition(0,0,0)
        bullet.setWorldPosition(this.node.getPosition())
        const rgd = bullet.getComponent(RigidBody)
        rgd.setLinearVelocity(new Vec3(0,0,-this.attackSpeed))
    }
}


