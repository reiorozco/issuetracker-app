import "./theme-config.css";
import LatestIssues from "@/app/LatestIssues";

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  console.log(searchParams);

  return <LatestIssues />;
}
