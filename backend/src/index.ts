import express, { Request, Response } from 'express'
import cors from 'cors'
import { db } from './lib/db'
import {
  users,
  insertUserSchemaParams,
  updateUserSchemaParams,
  findUserSchemaParams,
} from './lib/db/schema/users'

import { and, eq } from 'drizzle-orm'
import { Errors } from './lib/util/errors'
import { alphabet, generateRandomString } from 'oslo/crypto'

const app = express()
app.use(express.json())
app.use(cors())

// Create a new user
app.post('/users/new', async (req: Request, res: Response) => {
  const userData = req.body
  const validateUserData = insertUserSchemaParams.safeParse(userData)
  if (!validateUserData.success) {
    return res.status(400).json({
      error: Errors.ValidationError,
      data: undefined,
      success: false,
    })
  }
  try {
    const existingUser = await db.query.users.findFirst({
      where: (user, { eq, or }) =>
        or(
          eq(user.email, userData.email),
          eq(user.username, userData.username)
        ),
    })

    if (existingUser) {
      const { email } = existingUser
      const error =
        email === userData.email
          ? Errors.EmailAlreadyInUse
          : Errors.UsernameAlreadyTaken

      return res.status(409).json({
        error,
        data: undefined,
        success: false,
      })
    }

    const userPassword = generateRandomString(10, alphabet('a-z', '0-9'))
    const [user] = await db
      .insert(users)
      .values({ ...userData, password: userPassword })
      .returning()

    const { password, ...userWithoutPassword } = user ?? {}

    return res.status(201).json({
      error: undefined,
      data: userWithoutPassword,
      succes: true,
    })
  } catch (error) {
    console.log(error)
    // Return a failure error response
    return res.status(500).json({
      error: Errors.ServerError,
      data: undefined,
      success: false,
    })
  }
})

// Edit a user
app.post('/users/edit/:userId', async (req: Request, res: Response) => {
  const id = parseInt(req.params.userId)
  const rawUserData = req.body

  const validatedUserData = updateUserSchemaParams.safeParse({
    id,
    ...rawUserData,
  })
  if (!validatedUserData.success) {
    return res.status(400).json({
      error: Errors.ValidationError,
      data: undefined,
      success: false,
    })
  }

  const userData = validatedUserData.data

  try {
    const findUserById = await db.query.users.findFirst({
      where: (user, { eq }) => eq(user.id, userData.id!),
    })
    if (!findUserById) {
      return res.status(404).json({
        error: Errors.UserNotFound,
        data: undefined,
        success: false,
      })
    }

    if (userData.email) {
      const emailAlreadyInUse = await db.query.users.findFirst({
        where: (user, { eq, not }) =>
          and(eq(user.email, userData.email!), not(eq(user.id, userData.id!))),
      })

      if (emailAlreadyInUse) {
        return res.status(409).json({
          error: Errors.EmailAlreadyInUse,
          data: undefined,
          success: false,
        })
      }
    }

    if (userData.username) {
      const usernameAlreadyTaken = await db.query.users.findFirst({
        where: (user, { eq, not }) =>
          and(
            eq(user.username, userData.username!),
            not(eq(user.id, userData.id!))
          ),
      })

      if (usernameAlreadyTaken) {
        return res.status(409).json({
          error: Errors.UsernameAlreadyTaken,
          data: undefined,
          success: false,
        })
      }
    }

    const [updateUser] = await db
      .update(users)
      .set(validatedUserData.data)
      .where(eq(users.id, id))
      .returning()

    // extract the password
    const { password, ...userWithoutPassword } = updateUser ?? {}

    return res.status(201).json({
      error: undefined,
      data: userWithoutPassword,
      succes: true,
    })
  } catch (error) {
    console.log(error)
    // Return a failure error response
    return res.status(500).json({
      error: Errors.ServerError,
      data: undefined,
      success: false,
    })
  }
})

// Get a user by email
app.get('/users', async (req: Request, res: Response) => {
  const emailParam = req.query.email as string
  const validatedEmail = findUserSchemaParams.safeParse({ emailParam })

  if (!validatedEmail.success) {
    return res.status(400).json({
      error: Errors.ValidationError,
      data: undefined,
      success: false,
    })
  }

  try {
    const email = validatedEmail.data.email
    const user = await db.query.users.findFirst({
      where: (user, { eq }) => eq(user.email, email),
    })

    if (!user) {
      return res.status(404).json({
        error: Errors.UserNotFound,
        data: undefined,
        success: false,
      })
    }

    // extract the password
    const { password, ...userWithoutPassword } = user

    return res.status(200).json({
      error: undefined,
      data: userWithoutPassword,
      success: true,
    })
  } catch (error) {
    console.log(error)
    // Return a failure error response
    return res.status(500).json({
      error: Errors.ServerError,
      data: undefined,
      success: false,
    })
  }
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
