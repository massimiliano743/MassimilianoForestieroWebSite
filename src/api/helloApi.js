export async function fetchHello() {
  const res = await fetch('/api/hello');
  if (!res.ok) throw new Error('HTTP ' + res.status);
  return res.json();
}

