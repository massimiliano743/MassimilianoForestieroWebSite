export function HelloMessage({loading, error, message}) {
  if (loading) return <div>...</div>;
  if (error) return <div style={{color: 'red'}}>Errore</div>;
  return <div>{message}</div>;
}

