export function vitals() {
  const data = import.meta.env.VERCEL_ANALYTICS_ID;

  console.log("data:", data);
}
