import Pagination from "@/app/components/Pagination";

import "./theme-config.css";

export default function Home() {
  return (
    <div>
      <h1>Hello Next.js</h1>

      <Pagination itemCount={100} pageSize={10} currentPage={1} />
    </div>
  );
}
