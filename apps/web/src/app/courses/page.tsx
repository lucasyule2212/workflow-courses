import loadSerializableQuery from "@/relay/loadSerializableQuery";
import { Metadata } from "next";
import CoursesComponentQueryNode, {
  coursesComponentQuery,
} from "../../../__generated__/coursesComponentQuery.graphql";
import CoursesComponent from "./courses-component";
import { Button } from "@repo/ui/components/ui/button";
import { PlusIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Courses - Workflow",
};

export default async function Home() {
  const preloadedQuery = await loadSerializableQuery<
    typeof CoursesComponentQueryNode,
    coursesComponentQuery
  >(CoursesComponentQueryNode.params, {});

  return (
    <main>
      <div className="relative overflow-hidden">
        <main className="py-20 max-w-7xl mx-auto flex flex-col ">
          <div className="text-center mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl ">
            <h2 className="text-base font-semibold tracking-wider text-cyan-600 uppercase">
              Start your journey
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
              Make your enrollment
            </p>
          </div>
          <Button className="w-fit self-end gap-2">
            New Course <PlusIcon className="w-5" />
          </Button>
          <CoursesComponent preloadedQuery={preloadedQuery} />
        </main>
      </div>
    </main>
  );
}
