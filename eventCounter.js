const bounds = Object.freeze({
    lowerBound: 0
});

class Node {
    constructor(date, count) {
        this.date = date;
        this.count = count;
        this.next = null;
        this.previous = null;
    }
    getDate() {
        return this.date;
    }
    getCount() {
        return this.count
    }
    getSize() {
        let size = 1;
        let nextNode = this.next;
        while(nextNode != null) {
            size += 1
            nextNode = nextNode.next;
        }
        return size;
    }
    setNext(time) {
        this.next = time;
    }
    getNext() {
        return this.next;
    }
    setPrevious(time) {
        this.previous = time;
    }
    getPrevious() {
        return this.previous;
    }
}

export class EventCounter {

    constructor(upperBound = 300000) {

        if(typeof(upperBound) !== "number") {
            throw "Sorry, the time must be a number.";
        } 
        if(upperBound === 0) {
            throw "Sorry, the time must be greater than 0."
        }

        this.counter = 0;
        this.linkedListHead = new Node(new Date(), 0);
        this.linkedListTail = this.linkedListHead;
        this.stopCounter = false;
        this.upperBound = upperBound;

        this.trackSignals();
        
    }

    sendSignal() {
        try {
            this.counter += 1;
        } catch (error) {
            throw 'Failed to update counter. Please try again.';
        }
    }

    getCount(time = Math.ceil(this.upperBound/1000)) {
        if(typeof(time) !== "number") {
            throw "Sorry, the time must be a number.";
        }
        if(time <= bounds.lowerBound) {
            throw `Sorry, the time must be greater than ${bounds.lowerBound}.`;
        }
        if(time > this.upperBound) {
            throw `Sorry, the time must be less than or equal to the upper bound ${this.upperBound}.`;
        }
        let currentNode = this.linkedListTail;
        let totalCount = 0;
        let currentTime = 0;
        while(currentNode.getPrevious() !== null && currentTime <= time) {
            currentTime += 1;
            totalCount += currentNode.getCount();
            currentNode = currentNode.getPrevious();
        }
        return totalCount;
    }

    setNext(node) {
        this.linkList.setNext(node);
    }


    trackSignals() {    
        let interval = setInterval(callback, 1000);
        let _this = this;
        function callback() {
            let tail = _this.linkedListTail;
            let newTail = new Node(new Date(), _this.counter);
            _this.linkedListTail.setNext(newTail);
            _this.linkedListTail = _this.linkedListTail.getNext();
            _this.linkedListTail.setPrevious(tail);
            _this.counter = 0;

            if(_this.linkedListHead.getSize() > Math.ceil(_this.upperBound/1000)) {
                _this.linkedListHead = _this.linkedListHead.getNext();
                _this.linkedListHead.previous = null;
            }
            if(_this.stopCounter) {
                clearInterval(interval);
            }
        }
    }


    // Debugging Methods
    setStop(){
        this.stopCounter = true;
    }

    showLinkedList() {
        let currentNode = this.linkedListHead;
        while(currentNode !== null) {
            console.log(currentNode);
            currentNode = currentNode.getNext();
        }
    }
}
