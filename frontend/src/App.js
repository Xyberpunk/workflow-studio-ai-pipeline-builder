import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { Layout } from './components/Layout';
import { usePipelineSubmit } from './submit';

function App() {
  const { isSubmitting, submitPipeline } = usePipelineSubmit();

  return (
    <Layout
      toolbar={<PipelineToolbar />}
      canvas={<PipelineUI />}
      isSubmitting={isSubmitting}
      onSubmit={submitPipeline}
    />
  );
}

export default App;
