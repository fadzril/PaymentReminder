import { observable, computed, action, extendObservable } from 'mobx';
import axios from 'axios';
import Task from '../models/task';

const config = {
    headers: { 'Content-Type': 'application/json'}
}

export class TaskStore {
    @observable tasks = [];
    @observable totalAmount = 0;
    @observable totalPay = 0;
    @observable completed = 0;
    @observable pending = 0;

    constructor() {
        this._fetch();
    }

    @computed get total() {
        return (this.totalAmount).toFixed(2);
    }

    @computed get payable() {
        return (this.totalPay).toFixed(2)
    }

    @action _setPayable() {

        console.log('setpayable');
        let total = 0;
        let completed = 0;

        this.tasks.map( item => {
            if (item.paid) {
                completed++;
            } else {
                item.sessions.filter(s => {
                    if (s.checkin) {
                        total += s.price;
                    }
                })
            }
        })
        this.completed = completed;
        return this.totalPay = total;
    }

    _find(id) {
        let item = this.tasks.find( item => item.id == id);
        return item;
    }

    _fetch() {
        axios.get('http://localhost:5000/tasks')
            .then( response => {
                let result = response.data.data;

                result.map(item => {
                    let task = new Task(item);
                    this.tasks.push(task);
                    this.totalAmount += item.amount;
                    this._setPayable();
                });
            })
            .catch( error => console.log(error));
    }

    _delete(id) {
        let params = { id: id };
        axios.post(`http://localhost:5000/tasks/${id}`)
            .then( result => {
                if (! result.error) {
                    let tf = this.tasks.find( item => item.id == id)
                    return this.tasks.splice(tf, 0);
                }
            })
            .catch( error => console.log(error));
    }

    _checkin(item, cb) {
        axios.post(`http://localhost:5000/tasks/${item.tid}/checkin/${item.id}?status=${item.type}`)
            .then( result => {
                if (! result.error) {
                    if (cb) return cb()
                }
            })
            .catch( error => console.error(error) )
    }

    _pay(id, cb) {
        axios.post(`http://localhost:5000/tasks/${id}/paid`, {}, config)
            .then( result => {
                if (! result.error) {
                    alert(result.data.msg);
                    if (cb) return cb()
                }
            })
            .catch( error => console.error(error) )
    }

    _save(params, cb) {
        let data = {
            label: params.label,
            description: params.description,
            amount: parseInt(params.amount,10),
            paid: 0,
            sessions : params.sessions
        };
        axios.post('http://localhost:5000/tasks', data, config)
            .then( result => {
                if (! result.error) {
                    // Some issue using this option
                    // this.tasks.push(data);

                    // For this time, just use dirty old way
                    this._fetch();
                    
                    alert(result.data.msg);
                    if (cb) return cb()
                }
            })
            .catch( error => console.error(error) )
    }
}
