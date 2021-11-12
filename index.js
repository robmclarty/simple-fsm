const createMachine = stateMachineDefinition => {
  const machine = {
    value: stateMachineDefinition.status,
    transition: (currentState, event) => {
      const currentStateDefinition = stateMachineDefinition[currentState]
      const destinationTransition = currentStateDefinition.transitions[event]

      if (!destinationTransition) return

      const destinationState = destinationTransition.target
      const destinationStateDefinition = stateMachineDefinition[destinationState]

      destinationTransition.action()
      currentStateDefinition.actions.onExit()
      destinationStateDefinition.actions.onEnter()

      machine.value = destinationState

      return machine.value
    }
  }

  return machine
}

const machine = createMachine({
  status: 'off', // initial state
  off: {
    actions: {
      onEnter: () => {
        console.log('off: onEnter')
      },
      onExit: () => {
        console.log('off: onExit')
      }
    },
    transitions: {
      toggle: {
        target: 'on',
        action: () => {
          console.log('transition action for "toggle" in "off" state')
        }
      }
    }
  },
  on: {
    actions: {
      onEnter: () => {
        console.log('on: onEnter')
      },
      onExit: () => {
        console.log('on: onExit')
      }
    },
    transitions: {
      toggle: {
        target: 'off',
        action: () => {
          console.log('transition action for "toggle" in "on" state')
        }
      }
    }
  }
})

let state = machine.value
console.log(`current state: ${state}`) // current state: off

state = machine.transition(state, 'toggle')
console.log(`current state: ${state}`) // current state: on

state = machine.transition(state, 'toggle')
console.log(`current state: ${state}`) // current state: off
