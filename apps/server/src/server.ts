import cors from '@koa/cors';
import Router from '@koa/router';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { graphqlHTTP } from 'koa-graphql';
import helmet from 'koa-helmet';
import logger from 'koa-logger';

import { env } from './env';
import schema from './graphql/schema';

const app = new Koa();
const router = new Router();

const graphqlServer = graphqlHTTP({ schema, graphiql: true });
router.all('/graphql', bodyParser(), graphqlServer);

app.listen(env.PORT, () => {
  console.log(`Server running at ${env.PORT} 🚀`);
});
app.use(graphqlServer);
app.use(logger());
app.use(cors());
app.use(helmet());
app.use(router.routes()).use(router.allowedMethods());
