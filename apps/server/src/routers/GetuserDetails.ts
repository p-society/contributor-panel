import { drizzlerClient } from "../db/index";
import { users } from "../db/schema/users";
import type { FastifyReply, FastifyRequest } from "fastify";

export async function getUserDetails(
  req: FastifyRequest,
  res: FastifyReply
) {
  try {
    const userList = drizzlerClient
      .select()
      .from(users)
      .all();

    userList.sort((a, b) => b.points - a.points);
    const result = userList.map((user, idx) => ({
      rank: idx + 1,
      github: user.githubid,
      pts: user.points,
    }));

    return res.send(result);
  } catch (error) {
    console.error("Error fetching user details:", error);
    return res.status(500).send({ error: "Internal server error" });
  }
}