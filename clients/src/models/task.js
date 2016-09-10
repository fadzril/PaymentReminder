import { observable, computed, action, extendObservable } from 'mobx';

export default class Task {
    @observable label;
    @observable description;
    @observable amount;
    @observable paid;
    @observable checkin ;
    @observable sessions;

    constructor(task) {
        const {id, label, paid, description, amount, checkin, sessions} = {...task};

        this.id = id;
        this.label = label,
        this.description = description,
        this.paid = paid,
        this.amount = amount,
        this.checkin = checkin,
        this.sessions = sessions
    }

    @action total() {
        return this.amount.toFixed(2)
    }
}
