# FSM (Finite State Machine)

ref: https://kentcdodds.com/blog/implementing-a-simple-state-machine-library-in-javascript

requirements:

1. one state is defined as the initial state; when a machine starts to execute,
it enteres this state
2. each state can define actions that occur when a machine enters or exist that
state; actions will typically have side effects
3. each state can define events that trigger a transition
4. a transition defines how a machine would react to the event, by exiting one
state and entering another state
5. a transition can define actions that occur when the transition happens;
actions will typically have side effects

when an event happens:

1. the event is checked against the current state's transitions
2. if a transition matches the event, that transition "happens"
3. by virtue of a transition "happening", states are exited and entered, and
the relevant actions are performed
4. the machine immediately is in the new state, ready to process the next event
