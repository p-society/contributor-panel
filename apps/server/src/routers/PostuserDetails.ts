import { drizzlerClient } from "../db/index";
import { users } from "../db/schema/users";
import type { FastifyReply, FastifyRequest } from "fastify";
import { eq } from "drizzle-orm";


export async function postUserDetails(
  req: FastifyRequest,
  res: FastifyReply
) {
  try {
    const { githubid, points } = req.body as {
      githubid: string;
      points: number;
    };

    if (!githubid || typeof points !== "number") {
      return res.status(400).send({ error: "Invalid input data" });
    }

    const existing = await drizzlerClient
      .select()
      .from(users)
      .where(eq(users.githubid, githubid))
      .get();

    if (existing) {
      const updated = await drizzlerClient
        .update(users)
        .set({ points: existing.points + points })
        .where(eq(users.githubid, githubid))
        .returning();
      return res.status(200).send(updated);
    } else {
      const newUser = await drizzlerClient
        .insert(users)
        .values({ githubid, points })
        .returning();
      return res.status(201).send(newUser);
    }
  } catch (error) {
    console.error("Error inserting/updating user details:", error);
    return res.status(500).send({ error: "Internal server error" });
  }
}