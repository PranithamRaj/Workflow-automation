type WorkflowAction =
  | { type: "form"; url: string; label: string }
  | { type: "webhook"; url: string; label: string }

export const WORKFLOW_ACTIONS: Record<number, WorkflowAction> = {
  2: {
    type: "form",
    url: "https://sumerian0.app.n8n.cloud/form/bc27041c-65a6-4ebb-8fa0-0481fe4537c0",
    label: "Open Onboarding Form",
  },
  3: {
    type: "form",
    url: "https://sumerian0.app.n8n.cloud/form/cbe784d6-6dfa-4bf4-b10a-c80eb57333d6",
    label: "Open Support Form",
  },
  4: {
    type: "webhook",
    url: "https://sumerian0.app.n8n.cloud/webhook/cc7ea8b0-0e1b-41ec-8795-c50c0a1fbc0c",
    label: "Activate Workflow",
  },
}
