export abstract class GPUProvider {
  abstract initialize(): Promise<void>;
  abstract executeTask(task: any): Promise<any>;
  abstract monitorUsage(): Promise<any>;
  abstract shutdown(): Promise<void>;
}
