// app/contexts/gpuContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { BoltGPUExtension } from '~/extensions/bolt-gpu-extension';

const GPUContext = createContext<BoltGPUExtension | null>(null);

export const GPUProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gpuExtension, setGpuExtension] = useState<BoltGPUExtension | null>(null);

  useEffect(() => {
    const extension = new BoltGPUExtension();
    extension.initialize().then(() => {
      setGpuExtension(extension);
    }).catch((error) => {
      console.error("Failed to initialize GPU extension:", error);
    });
  }, []);

  return (
    <GPUContext.Provider value={gpuExtension}>
      {children}
    </GPUContext.Provider>
  );
};

export const useGPU = () => {
  const context = useContext(GPUContext);
  if (context === null) {
    throw new Error('useGPU must be used within a GPUProvider');
  }
  return context;
};
