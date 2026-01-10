import { Suspense } from "react";
import { UniversalFiltersExample } from "../../../../examples";

export default function FiltersExamplePage() {
  return (
    <Suspense fallback={<div>Loading filters...</div>}>
      <UniversalFiltersExample />
    </Suspense>
  );
}
