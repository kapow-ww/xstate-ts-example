import { createMachine, assign } from "xstate";

type OrderContext = {
  orderId: string | null;
  status: string | null;
};

type OrderEvent =
  | { type: "CREATE"; id: string }
  | { type: "APPROVE" }
  | { type: "REJECT" }
  | { type: "COMPLETE" };

export const orderMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QHsBOEyoHQEsIBswBiAYQCUBRAQQBUKBtABgF1FQAHZWHAFx2QB2bEAA9EARgBs4rIzmNxAVgBMigBwB2NQE5GkgDQgAnok1ZtUyRsbb1yhYzUBfJ4bQZs7MAIg4BUIioABSCyAHkANQYWYU5uPkFhMQQAFgUsRS1xaw0NSQBmK2VDEwRsjSwUxXzxZXzFSW0UtTVqlzd0TCwvHz8AygApChIaJlYkEDjefiEJ5LSZTLVsxlyCopLTRfk5FLy1fI1xFPaQdy72VGQAYzhuf1IwgFkggBkKOjHYrmnEucRGowMkpJAVjo0NMoNJsyrlKtVavVGs1WvkXK4QAJkBh4BNzqhvvEZklEABaAzGMmSU743AEMCE36zUDzYqUsriGTHfLKBb5fLaZTiNEY2k9Xz+RkJZmiRDKNTKDJZRQq7JLcQwzlclI8oV6Rg6lLaDQ0zqeK63WD3KBS4n-BCKHVYOopFJSbTSUHabQw+xAqwewUaKr2TQnUVmrDXZAAW3YhB4kFtfxZpkKWBB+UY+TSmWk0PZ4m9lWUgahIccwdNHiwqDAACswNdExBkzLktVFMCGmCUhCoZrs5U8g0PSoVRpCuinEA */
  id: "order",
  initial: "idle",
  context: {
    orderId: null,
    status: null,
  } as OrderContext,
  states: {
    idle: {
      on: {
        CREATE: {
          target: "pending",
          actions: assign({
            orderId: ({ event }) => event.id,
            status: "pending",
          }),
        },
      },
    },
    pending: {
      on: {
        APPROVE: {
          target: "processing",
          actions: assign({ status: "processing" }),
        },
        REJECT: {
          target: "rejected",
          actions: assign({ status: "rejected" }),
        },
      },
    },
    processing: {
      on: {
        COMPLETE: {
          target: "completed",
          actions: assign({ status: "completed" }),
        },
      },
    },
    completed: {
      type: "final",
    },
    rejected: {
      type: "final",
    },
  },
});
