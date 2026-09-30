import { Card } from 'wp_shared/Card';

export default function ModuleErrorPage({ moduleName }: { moduleName: string }) {
  return (
    <Card title="Module unavailable">
      <p>{moduleName} failed to load. Is its dev server running?</p>
      <button type="button" onClick={() => window.location.reload()}>
        Retry
      </button>
    </Card>
  );
}
