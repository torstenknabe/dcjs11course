const addEventListener = handler => event => eventMap =>
   eventMap.has(event) ?
     new Map (eventMap).set(event, eventMap.get(event).concat([handler])) :
     new Map (eventMap).set(event, [handler]);

const dispatchEvent = event => eventMap =>
  (eventMap.has(event) && eventMap.get(event).forEach (a => a()))
  || event;

const log = x => console.log (x) || x;
const handler = () => log('hi')

const eventMap =
  addEventListener
    (handler) // handler
    ('hello') // event
    (new Map ()); // event Map

dispatchEvent('hello')(eventMap); // ?
