import express, { Request, Response } from 'express'
import cors from 'cors'
import { db } from './lib/db'
import {
  users,
  insertUserSchemaParams,
  updateUserSchemaParams,
} from './lib/db/schema/users'

import { and, eq, not, or } from 'drizzle-orm'
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
    const existingUser = db
      .select()
      .from(users)
      .where(
        or(
          eq(users.email, userData.email),
          eq(users.username, userData.username)
        )
      )
      .get()

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
    const user = await db
      .insert(users)
      .values({ ...userData, password: userPassword })
      .returning()

    const { password, ...userWithoutPassword } = user[0] ?? {}

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
  // ...
})

// Get a user by email
app.get('/users', async (req: Request, res: Response) => {
  // ...
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
