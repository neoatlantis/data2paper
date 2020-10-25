class EventEmitter{

    constructor(){
        this._listeners = [];

        this.on = this.addEventListener;
        this.emit = this.dispatchEvent;
    }

    addEventListener (type, callback) {
        if(this._listeners[type] == undefined) this._listeners[type] = [];
        this._listeners[type].push(callback);
    }

    dispatchEvent (type) {
        if (this._listeners[type] == undefined) { return true; }
        var stack = this._listeners[type];
        var argv = [];
        for(var i=1; i<arguments.length; i++) argv[i-1] = arguments[i];
        for (var i = 0; i < stack.length; i++) {
            stack[i].apply(this, argv);
        }
    }
}

export { EventEmitter };
