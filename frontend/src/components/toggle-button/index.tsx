import { useActor } from "@xstate/react";
import { createMachine } from "xstate";

const toggleMachine = createMachine({
  initial: "inactive",
  states: {
    inactive: {
      on: {
        toggle: {
          target: "active",
        },
      },
    },
    active: {
      on: {
        toggle: {
          target: "inactive",
        },
      },
    },
  },
});

function ToggleButton() {
  const [state, send] = useActor(toggleMachine);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-3xl">{JSON.stringify(state.value)}</p>
      <button className="btn" onClick={() => send({ type: "toggle" })}>
        toggle
      </button>
    </div>
  );
}

export default ToggleButton;
