import { json } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
import { getGPUInstance } from "~/utils/gpuUtils";

export const action: ActionFunction = async ({ request }) => {
  try {
    const gpuExtension = await getGPUInstance();
    const formData = await request.formData();
    const task = formData.get("task");
    const provider = formData.get("provider");

    if (!task || !provider) {
      return json({ error: "No task or provider provided" }, { status: 400 });
    }

    let taskData;
    try {
      taskData = JSON.parse(task as string);
    } catch (error) {
      return json({ error: "Invalid task format. Please provide valid JSON." }, { status: 400 });
    }

    console.log("Received GPU task for provider:", provider, "Task:", taskData);
    const result = await gpuExtension.executeTask(provider as string, taskData);
    console.log("GPU task result:", result);
    return json({ success: true, result });
  } catch (error: any) {
    console.error("GPU task error:", error);
    return json({ error: error.message || "Unknown error" }, { status: 500 });
  }
};
