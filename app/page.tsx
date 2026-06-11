import SectionStack from "@/components/SectionStack";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function Page() {
  return (
    <ErrorBoundary>
      <SectionStack />
    </ErrorBoundary>
  );
}
