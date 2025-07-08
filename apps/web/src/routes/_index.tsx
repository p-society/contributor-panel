import type { Route } from "./+types/_index";
import { useEffect, useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";


export function meta({}: Route.MetaArgs) {
  return [{ title: "leaderboard" }, { name: "description", content: "leaderboard" }];
}

export default function Home() {
  const [contributors, setContributors] = useState<Array<{
    rank: number;
    github: string;
    pts: number;
  }> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/details")
      .then((res) => res.json())
      .then((data) => {
        setContributors(data);
        setLoading(false);
        console.log("Contributors fetched:", data);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="container mx-auto max-w-3xl px-4 py-2">
      <div className="grid gap-6">
        <section className="rounded-lg border p-4">
          <h2 className="mb-4 font-semibold text-lg tracking-tight">Contribution Panel</h2>
          <Card className="shadow-none border-0">
            <CardContent className="p-0">
              <div className="overflow-x-auto rounded-lg">
                <table className="min-w-full text-sm text-left border-separate border-spacing-y-2">
                  <thead>
                    <tr className="text-muted-foreground">
                      <th className="px-4 py-2 font-medium">Ranking</th>
                      <th className="px-4 py-2 font-medium">GitHub ID</th>
                      <th className="px-4 py-2 font-medium">Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      Array.from({ length: 5 }).map((_, i) => (
                        <tr key={i}>
                          <td className="px-4 py-2"><Skeleton className="h-4 w-8" /></td>
                          <td className="px-4 py-2"><Skeleton className="h-4 w-32" /></td>
                          <td className="px-4 py-2"><Skeleton className="h-4 w-8" /></td>
                        </tr>
                      ))
                    ) : contributors && contributors.length > 0 ? (
                      contributors.map((c, i) => (
                        <tr key={c.github} className="hover:bg-accent/40 transition-colors">
                          <td className="px-4 py-2 font-semibold">{c.rank}</td>
                          <td className="px-4 py-2">
                            <a
                              href={`https://github.com/${c.github}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary underline underline-offset-2 hover:text-accent-foreground"
                            >
                              {c.github}
                            </a>
                          </td>
                          <td className="px-4 py-2 font-bold text-green-600">{c.pts}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="px-4 py-6 text-center text-muted-foreground">
                          No contributors found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
