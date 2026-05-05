import dynamic from "next/dynamic";

const ClientLayout = dynamic(() => import("@/components/ClientLayout"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "var(--color-cream)",
      }}
    />
  ),
});

export default function Home() {
  return <ClientLayout />;
}
