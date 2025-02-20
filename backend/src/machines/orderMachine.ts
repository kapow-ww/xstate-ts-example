// src/machines/orderMachine.ts
import { createMachine, assign } from "xstate";

interface Order {
  id: string;
  amount: number;
  customerEmail: string;
}

interface OrderContext {
  order: Order | null;
  error: string | null;
}

type OrderEvent =
  | { type: "CREATE"; order: Order }
  | { type: "APPROVE" }
  | { type: "REJECT"; reason: string }
  | { type: "PROCESS" }
  | { type: "COMPLETE" }
  | { type: "CANCEL" };

// Create simple machine
export const orderMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QHsBOEyoHQEsIBswBiAYQCUBRAQQBUKBtABgF1FQAHZWHAFx2QB2bEAA9EARgBsjLAE558gOyTFAZmmSAHJIA0IAJ4SArABYsigEyTpl2VtUXFRgL7O9aDNnZgBEHAKgiKgAFYLIAeQA1BhZhTm4+QWExBBNGcSwjRU1xCyNNSycLPUMEcUVFLBMjVSlxRkZNWtlxE1d3dEwsb19-QMoAKQoSGiZWJBB43n4hCZS0jKycvILHI2KDRBzMhoanE00LVqz2kA8unr8A0ioAORIKABkxuK5ppLnEBczs3PzC9YlRCqRhmSTiWSaEwWWSqVQmNR5U7nLyoZAAYzg3GuJHCAFlgo8KHQXhMpolZqAUpJZDIjOIjJIYZp6U1akCynCsOpZBVVAUKk56cjOqiMVi+jd7k9SRw3hTkogaXSGUzIay4eIOeImlhtJCIS0TLS1G1TgJkBh4BMUa8EjNFQgALS6TbOoxyBQ1RTpCEFRiSEWeXAEMB296U0RfDalcqVWQ1CyMNTJ3KgwNuM6i7o+K5QcMKz4ICyHH7LHLyY5at1xuQ1OoNJoQ8RBi5ozGwbH5snyh1F0yVBGqBMs9WM2Taip1hzJkGKNMmDMdYPo5AAW3YhB4kALfapW3UWFVeRM0MkCIq2ocWHBvMhTQTR1Uilb2FQYAAVmB0duILuPvuCA1B69KMiWOTrIwpjaowqhVMo+RMkcp4qJor5YOiACGAiYvghB-j29oAVGCBNJIR5gaYZ4XooHIwuRSYzjqyiOJovKuK4QA */
  id: "order",
  initial: "idle",
  context: {
    order: null,
    error: null,
  } as OrderContext,
  states: {
    idle: {
      on: {
        CREATE: {
          target: "pending",
          actions: assign({
            order: ({ event }) => event.order,
          }),
        },
      },
    },
    pending: {
      on: {
        APPROVE: "processing",
        REJECT: {
          target: "rejected",
          actions: assign({
            error: ({ event }) => event.reason,
          }),
        },
        CANCEL: "cancelled",
      },
    },
    processing: {
      on: {
        COMPLETE: "completed",
        CANCEL: "cancelled",
      },
    },
    completed: {
      type: "final",
    },
    rejected: {
      type: "final",
    },
    cancelled: {
      type: "final",
    },
  },
});
