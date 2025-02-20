import { useMachine } from "@xstate/react";
import { setup, assign } from "xstate";

const counterMachine = setup({
  types: {
    context: {} as { count: number },
    events: {} as { type: "inc" } | { type: "dec" } | { type: "reset" },
  },
  actions: {
    increment: assign({
      count: ({ context }) => context.count + 1,
    }),
    decrement: assign({
      count: ({ context }) => context.count - 1,
    }),
    reset: assign({
      count: () => 0,
    }),
  },
}).createMachine({
  context: { count: 0 },
  on: {
    inc: { actions: "increment" },
    dec: { actions: "decrement" },
    reset: { actions: "reset" },
  },
});
function CountButton() {
  const [state, send] = useMachine(counterMachine);

  return (
    <div className="flex flex-col gap-4 text-center justify-center">
      <div className="text-3xl">{JSON.stringify(state.context.count)}</div>
      <div className="flex gap-4">
        <button
          className="btn btn-success"
          onClick={() => send({ type: "inc" })}
        >
          inc
        </button>
        <button className="btn btn-error" onClick={() => send({ type: "dec" })}>
          dec
        </button>
        <button
          className="btn btn-warning"
          onClick={() => send({ type: "reset" })}
        >
          reset
        </button>
      </div>
    </div>
  );
}

export default CountButton;
