import "dotenv/config";
import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { getUserDetails } from "./routers/GetuserDetails";
import { postUserDetails } from "./routers/PostuserDetails";




const baseCorsConfig = {
  origin: process.env.CORS_ORIGIN || "",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With"
  ],
  credentials: true,
  maxAge: 86400,
};

const fastify = Fastify({
  logger: true,
});

fastify.register(fastifyCors, baseCorsConfig);



fastify.get('/', async () => {
  return 'OK'
})

fastify.get('/details', getUserDetails);
fastify.post('/add-details', postUserDetails);

fastify.listen({ port: 3000 }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log("Server running on port 3000");
});
