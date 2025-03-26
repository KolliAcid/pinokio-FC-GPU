import { LightningGPUProvider } from './lightning-gpu-provider';
import { RunPodGPUProvider } from './runpod-gpu-provider';
import { GoogleColabGPUProvider } from './google-colab-gpu-provider';
import { KaggleGPUProvider } from './kaggle-gpu-provider';
import { PaperspaceGradientGPUProvider } from './paperspace-gradient-gpu-provider';
import { HuggingFaceSpacesGPUProvider } from './hugging-face-spaces-gpu-provider';
import { ModalLabsGPUProvider } from './modal-labs-gpu-provider';
import { LambdaLabsFreeGPUProvider } from './lambda-labs-free-gpu-provider';

export class BoltGPUExtension {
  private gpuProviders: { [key: string]: any } = {};

  constructor() {
    this.registerProvider('lightning', new LightningGPUProvider());
    this.registerProvider('runpod', new RunPodGPUProvider());
    this.registerProvider('google-colab', new GoogleColabGPUProvider());
    this.registerProvider('kaggle', new KaggleGPUProvider());
    this.registerProvider('paperspace-gradient', new PaperspaceGradientGPUProvider());
    this.registerProvider('hugging-face-spaces', new HuggingFaceSpacesGPUProvider());
    this.registerProvider('modal-labs', new ModalLabsGPUProvider());
    this.registerProvider('lambda-labs-free', new LambdaLabsFreeGPUProvider());
  }

  registerProvider(name: string, provider: any) {
    this.gpuProviders[name] = provider;
  }

  async initializeProviders() {
    for (const providerName in this.gpuProviders) {
      if (this.gpuProviders.hasOwnProperty(providerName)) {
        await this.gpuProviders[providerName].initialize();
      }
    }
  }

  async executeTask(providerName: string, task: any) {
    if (this.gpuProviders[providerName]) {
      return await this.gpuProviders[providerName].executeTask(task);
    } else {
      throw new Error(`GPU provider ${providerName} not found.`);
    }
  }

  async monitorUsage(providerName: string) {
    if (this.gpuProviders[providerName]) {
      return await this.gpuProviders[providerName].monitorUsage();
    } else {
      throw new Error(`GPU provider ${providerName} not found.`);
    }
  }

  async shutdownProviders() {
    for (const providerName in this.gpuProviders) {
      if (this.gpuProviders.hasOwnProperty(providerName)) {
        await this.gpuProviders[providerName].shutdown();
      }
    }
  }
}
