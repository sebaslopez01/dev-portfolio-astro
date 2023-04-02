export function vitals() {
  const data = import.meta.env.PUBLIC_VERCEL_ANALYTICS_ID;

  console.log("data:", data);
}
