import Fastify from 'fastify'
import cors from '@fastify/cors'
import { pollRoutes } from './routes/poll'
import { userRoutes } from './routes/user'
import { guessRoutes } from './routes/guess'
import { authRoutes } from './routes/auth'
import { gameRoutes } from './routes/game'
import jwt from '@fastify/jwt'
import { privacy } from './routes/privacy'

async function bootstrap() {
    const PORT = process.env.PORT || 3333

    const fastify = Fastify({
        logger: true,
    })

    await fastify.register(cors, {
        origin: true
    })

    await fastify.register(jwt, {
        secret: process.env.JWT_SECRET as string
    })

    await fastify.register(pollRoutes)
    await fastify.register(authRoutes)
    await fastify.register(gameRoutes)
    await fastify.register(userRoutes)
    await fastify.register(guessRoutes)
    await fastify.register(privacy)

    await fastify.listen({ port: Number(PORT), host: '0.0.0.0'}) 
}

bootstrap()