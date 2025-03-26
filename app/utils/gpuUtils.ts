import { BoltGPUExtension } from '../extensions/bolt-gpu-extension';

let gpuExtension: BoltGPUExtension | null = null;

export async function getGPUInstance(): Promise<BoltGPUExtension> {
  if (!gpuExtension) {
    gpuExtension = new BoltGPUExtension();
    await gpuExtension.initializeProviders();
  }
  return gpuExtension;
}
