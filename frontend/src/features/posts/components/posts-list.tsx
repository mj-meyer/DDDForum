import { ArchiveX } from 'lucide-react'

import { Spinner } from '@/components/ui/spinner'

import { usePosts } from '../api/get-posts'
import { Post, Vote } from '@/types/api'

// TODO: Refactor to separate components
const PostItem = ({ post }: { post: Post }) => {
  const { title, votes, dateCreated } = post
  const author = post.memberPostedBy?.user?.username

  // should probably use a library for this
  // but good for now
  const calculateDaysOrHoursAgo = (date: string) => {
    const dateCreated = new Date(date)
    const today = new Date()
    const diffTime = Math.abs(today.getTime() - dateCreated.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60))
    const diffMinutes = Math.ceil(diffTime / (1000 * 60))
    return diffDays > 1
      ? `${diffDays} days ago`
      : diffHours > 1
        ? `${diffHours} hours ago`
        : `${diffMinutes} minutes ago`
  }
  const timeAgo = calculateDaysOrHoursAgo(dateCreated)

  const calculateVotes = (votes: Vote[]) => {
    return votes?.reduce((acc, vote) => {
      if (vote.voteType === 'Upvote') {
        return acc + 1
      } else {
        return acc - 1
      }
    }, 0)
  }
  const totalVotes = calculateVotes(votes)

  return (
    <div className="flex items-center space-x-4 p-2">
      <div className="flex flex-col items-center">
        <button className="text-gray-500">▲</button>
        <span>{totalVotes}</span>
        <button className="text-gray-500 rotate-180">▲</button>
      </div>
      <div>
        <h2 className="font-semibold">{title}</h2>
        <p className="text-sm text-gray-500">
          {timeAgo} | by {author} | {post.comments?.length} comments
        </p>
      </div>
    </div>
  )
}

export const PostsList = () => {
  const postsQuery = usePosts()

  if (postsQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!postsQuery?.data?.posts.length)
    return (
      <div
        role="list"
        aria-label="comments"
        className="flex h-40 flex-col items-center justify-center bg-white text-gray-500"
      >
        <ArchiveX className="size-10" />
        <h4>No Comments Found</h4>
      </div>
    )

  return (
    <div className="space-y-4">
      {postsQuery.data.posts?.map((post: Post) => (
        <PostItem post={post} key={post.id} />
      ))}
    </div>
  )
}
