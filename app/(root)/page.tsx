
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
export default async function HomePage() {
  await delay(3000); // Simulate a delay for loading effect
  return (
    <div>HomePage...</div>
  )
}
