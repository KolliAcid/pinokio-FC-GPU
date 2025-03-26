import React, { useState } from 'react';
import { useGPU } from '~/contexts/gpuContext';

export const GPUTasks: React.FC = () => {
  const gpuExtension = useGPU();
  const [task, setTask] = useState<string>('');
  const [provider, setProvider] = useState<string>('lightning');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setResult(null);
    try {
      const taskData = JSON.parse(task);
      const result = await gpuExtension.executeTask(provider, taskData);
      setResult(result);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const validateJSON = (input: string): boolean => {
    try {
      JSON.parse(input);
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <div>
      <h1>GPU Task Submission</h1>
      <form onSubmit={handleSubmit}>
        <select value={provider} onChange={(e) => setProvider(e.target.value)}>
          <option value="lightning">Lightning AI</option>
          <option value="runpod">RunPod</option>
          <option value="google-colab">Google Colab</option>
          <option value="kaggle">Kaggle</option>
          <option value="paperspace-gradient">Paperspace Gradient</option>
          <option value="hugging-face-spaces">Hugging Face Spaces</option>
          <option value="modal-labs">Modal Labs</option>
          <option value="lambda-labs-free">Lambda Labs Free</option>
        </select>
        <textarea
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter your GPU task in JSON format"
        />
        <button type="submit" disabled={!validateJSON(task)}>Submit Task</button>
      </form>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
};
