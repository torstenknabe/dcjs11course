class EventManager {
  construct (eventMap = new Map ()) {
    this.eventMap = eventMap;
  }
  addEventListener (event, handler) {
    if (this.eventMap.has (event)) {
      this.eventMap.set (event, this.eventMap.get (event).concat ([handler]));
    } else {
      this.eventMap.set (event, [handler]);
    }
  }
  dispatchEvent (event) {
    if (this.eventMap.has (event)) {
      const handlers = this.eventMap.get (event);
      for (const i in handlers) {
        handlers [i] ();
      }
    }
  }
}
const EM = new EventManager ();
EM.addEventListner ('hello', function () {
  console.log ('hi');
});
EM.dispatchEvent ('hello'); // hi