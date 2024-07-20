import { db } from '..'
import { comments } from '../schema/comments'
import { members } from '../schema/members'
import { posts } from '../schema/posts'
import { users } from '../schema/users'
import { votes } from '../schema/votes'
import {
  initialMemberUserIds,
  initialPostComments,
  initialPosts,
  initialPostVotes,
  initialUsers,
} from './data'
import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const promptUser = (query: string): Promise<string> => {
  return new Promise(resolve => rl.question(query, resolve))
}

const clearDatabase = async () => {
  await db.delete(comments)
  await db.delete(votes)
  await db.delete(posts)
  await db.delete(members)
  await db.delete(users)
}

const seedDatabase = async () => {
  // Insert users
  await db.insert(users).values(initialUsers)

  // Insert member-user relationships
  await db.insert(members).values(initialMemberUserIds)

  // Insert posts
  await db.insert(posts).values(initialPosts)

  // Insert post votes
  await db.insert(votes).values(initialPostVotes)

  // Insert post comments
  await db.insert(comments).values(initialPostComments)

  console.log('Seed complete!')
}

const runSeedScript = async () => {
  const answer = await promptUser(
    'Are you sure you want to delete all data and seed the database? (yes/no): '
  )

  if (answer.toLowerCase() === 'yes') {
    console.log('Clearing database...')
    await clearDatabase()
    console.log('Database cleared. Seeding database...')
    await seedDatabase()
    console.log('Database seeded successfully.')
  } else {
    console.log('Seeding aborted.')
  }

  rl.close()
}

runSeedScript().catch(console.error)
