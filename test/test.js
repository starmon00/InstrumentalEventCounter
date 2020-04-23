import { EventCounter } from '../eventCounter.js';
import { strict as assert } from 'assert';

// Helper Functions
function sendSignals(eventCounter, number) {
    for (let i = 0; i < number; i += 1) {
        eventCounter.sendSignal();
    }
}

describe('Event Counter', function() {
    this.timeout(60000);

    let eventCounter;

    describe('Sends signal successfully', function() {
        beforeEach(function() {
            eventCounter = new EventCounter(20000);
        });
        it('As soon as the eventCounter is initialized', function(done) {
            eventCounter.sendSignal();
            setTimeout(function() {
                assert.equal(eventCounter.getCount(1), 1);
                done();
            }, 1000);
        });
        it('After a duration of no signals', function(done) {
            setTimeout(function() {
                eventCounter.sendSignal();
                setTimeout(function() {
                    assert.equal(eventCounter.getCount(1), 1);
                    done();
                }, 1000);
            }, 10000);
        });
        it('When multiple signals are sent when eventCounter is initialized', function(done) {
            sendSignals(eventCounter, 100);
            setTimeout(function() {
                assert.equal(eventCounter.getCount(1), 100);
                done();
            }, 1000);
        });
        it('When multiple signals are sent after a duration of no signals', function(done) {
            setTimeout(function() {
                sendSignals(eventCounter, 100);
                setTimeout(function() {
                    assert.equal(eventCounter.getCount(1), 100);
                    done();
                }, 1000);
            }, 10000);
        });
        afterEach(function() {
            eventCounter.setStop();
        });
    });

    describe('Returns correct count', function() {
        beforeEach(function() {
            eventCounter = new EventCounter(20000);
        });
        it('When no signal is sent', function(done) {
            setTimeout(function() {
                assert.equal(eventCounter.getCount(5), 0);
                done();
            }, 5000);
        });
        it('When a single signal is sent', function(done) {
            setTimeout(function() {
                eventCounter.sendSignal();
                setTimeout(function() {
                    assert.equal(eventCounter.getCount(5), 1);
                    done();
                }, 5000);
            }, 5000);
        });
        it('When multiple signals are sent', function(done) {
            let intervalSignal = setInterval(function() {
                sendSignals(eventCounter, 5);
            }, 2000);
            setTimeout(function() {
                clearInterval(intervalSignal);
                assert.equal(eventCounter.getCount(5), 10);
                done();
            }, 5000);
        });
        afterEach(function() {
            eventCounter.setStop();
        });
    });

    describe('Validates input correctly', function() {
        describe('For EventCounter constructor', function() {
            describe('Should throw error', function() {
                it('When upperBound is not a number', function() {
                    try {
                        let newEventCounter = new EventCounter('a');
                        newEventCounter.setStop();
                        assert.fail("newEventCounter created successfully.");
                    } catch (e) {
                        assert.equal(e, "Sorry, the time must be a number.");
                    }
                });
                it('When upperBound is null', function(){
                    try {
                        let newEventCounter = new EventCounter(null);
                        newEventCounter.setStop();
                        assert.fail("newEventCounter created successfully.");
                    } catch (e) {
                        assert.equal(e, "Sorry, the time must be a number.");
                    }  
                });
                it('When upperBound is less than or equal to 0', function(){
                    try {
                        let newEventCounter = new EventCounter(0);
                        newEventCounter.setStop();
                        assert.fail("newEventCounter created successfully.");
                    } catch (e) {
                        assert.equal(e, "Sorry, the time must be greater than 0.");
                    }              
                });

            })
            describe('Should use default values', function() {
                it('When upperBound is empty', function(){
                    let newEventCounter = new EventCounter();
                    newEventCounter.setStop();
                    assert.equal(newEventCounter.upperBound, 300000);
                });
            });

        });
        describe('For getCount()', function(){
            describe('Should throw error', function() {
                beforeEach(function() {
                    eventCounter = new EventCounter(20000);
                });
                it('When time is null', function(){
                    try {
                        eventCounter.getCount(null);
                    } catch (e) {
                        assert(e, 'Sorry, the time must be a number.');
                    }
                });
                it('When time is not a number', function(){
                    try {
                        eventCounter.getCount('a');
                    } catch (e) {
                        assert(e, 'Sorry, the time must be a number.');
                    }
                });
                it('When time is less than or equal to 0', function(){
                    try {
                        eventCounter.getCount(0);
                    } catch (e) {
                        assert(e, 'Sorry, the time must be greater than 0.');
                    }
                });
                it('When time is greater than the upperbound', function(){
                    try {
                        eventCounter.getCount(200001);
                    } catch (e) {
                        assert(e, `Sorry, the time must be less than or equal to the upper bound 20000.`);
                    }
                });
                afterEach(function() {
                    eventCounter.setStop();
                });
            });
        });
    });
    describe('Prevents', function() {
        beforeEach(function() {
            eventCounter = new EventCounter(5000);
        });
        it('Memory leakage', function(done) {
            setTimeout(function() {
                assert.equal(eventCounter.linkedListHead.getSize(), 5);
                eventCounter.setStop();
                done();
            }, 10000);
        });
        afterEach(function() {
            eventCounter.setStop();
        });
    });
});
