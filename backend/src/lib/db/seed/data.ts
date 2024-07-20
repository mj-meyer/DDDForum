import { Comment } from '../schema/comments'
import { Post } from '../schema/posts'
import { User } from '../schema/users'
import { Vote } from '../schema/votes'

export const initialUsers: User[] = [
  {
    id: 1,
    email: 'luke.skywalker@rebellion.org',
    firstName: 'Luke',
    lastName: 'Skywalker',
    username: 'lukeskywalker',
    password: 'force123',
  },
  {
    id: 2,
    email: 'han.solo@rebellion.org',
    firstName: 'Han',
    lastName: 'Solo',
    username: 'hansolo',
    password: 'millennium',
  },
  {
    id: 3,
    email: 'leia.organa@rebellion.org',
    firstName: 'Leia',
    lastName: 'Organa',
    username: 'leiaorgana',
    password: 'princess',
  },
]

export const initialMemberUserIds = [
  { memberId: 1, userId: 1 },
  { memberId: 2, userId: 2 },
  { memberId: 3, userId: 3 },
]

export const initialPosts: Post[] = [
  {
    id: 1,
    title: 'May the Force be with you!',
    content: "This is Luke Skywalker's first post.",
    postType: 'text',
    dateCreated: new Date(),
    memberId: 1,
  },
  {
    id: 2,
    title: 'I’ve got a bad feeling about this.',
    content: "This is Han Solo's first post.",
    postType: 'text',
    dateCreated: new Date(),
    memberId: 2,
  },
  {
    id: 3,
    title: 'Help me, Obi-Wan Kenobi.',
    content: "This is Leia Organa's first post.",
    postType: 'text',
    dateCreated: new Date(),
    memberId: 3,
  },
  {
    id: 4,
    title: 'The Millennium Falcon',
    content: 'https://starwars.fandom.com/wiki/Millennium_Falcon',
    postType: 'link',
    dateCreated: new Date(),
    memberId: 2,
  },
]

export const initialPostVotes: Vote[] = [
  // Everyone upvotes their own first post
  { id: 1, postId: 1, voteType: 'Upvote', memberId: 1 },
  { id: 2, postId: 2, voteType: 'Upvote', memberId: 2 },
  { id: 3, postId: 3, voteType: 'Upvote', memberId: 3 },
  { id: 4, postId: 4, voteType: 'Upvote', memberId: 2 },

  // Han's post upvoted by Luke
  { id: 5, postId: 2, voteType: 'Upvote', memberId: 1 },

  // Luke's first post downvoted by Leia
  { id: 6, postId: 1, voteType: 'Downvote', memberId: 3 },
]

export const initialPostComments: Comment[] = [
  {
    id: 1,
    text: 'I posted this!',
    memberId: 1,
    postId: 1,
    parentCommentId: null,
  },
  { id: 2, text: 'Nice', memberId: 2, postId: 2, parentCommentId: null },
]
