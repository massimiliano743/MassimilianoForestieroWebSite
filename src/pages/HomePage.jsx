import { useHello } from '../hooks/useHello';
import {HelloMessage} from '../components/HelloMessage/HelloMessage';

export function HomePage() {
  const { data, loading, error } = useHello();
  return (
    <div>
      <h1>Home test 023</h1>
      <HelloMessage loading={loading} error={error} message={data?.message || ''} />
    </div>
  );
}

