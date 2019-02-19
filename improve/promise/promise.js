const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

module.exports =  class MyPromise {

    constructor(handle) {
        if (typeof handle !== 'function') throw new Error('Promise must accept a function as param');
        this._state = PENDING;
        this._value = undefined;

        // 状态改变回掉,遵循队列
        this.successList = []
        
        handle(this._resolve.bind(this), this._reject.bind(this));
    }

    _resolve(data) {
        if (this._state !== PENDING) return;
        this._state = FULFILLED;
        this._value = data;
        let cb;
        while(cb = this.successList.shift()) {
            cb(this._value);
        }
    }

    _reject(data) {

    }

    then(onResolve, onReject) {
        switch (this._state) {
            case PENDING:
                this.successList.push(onResolve);
                break;

            case FULFILLED:
                onResolve(this._value);
                break;
        }
    }
}