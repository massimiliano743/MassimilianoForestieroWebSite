import { useHello } from '../hooks/useHello';
import { HelloMessage } from '../components/HelloMessage';

export function HomePage() {
  const { data, loading, error } = useHello();
  return (
    <div>
      <h1>Home</h1>
      <HelloMessage loading={loading} error={error} message={data?.message || ''} />
    </div>
  );
}

