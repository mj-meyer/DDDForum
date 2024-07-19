import { Head } from '@/components/seo'

import { MainLayout } from '@/components/layouts/main-layout'

// PostItem Component
const PostItem = ({ upvotes, title, daysAgo, author, commentCount }) => (
  <div className="flex items-center space-x-4 p-2">
    <div className="flex flex-col items-center">
      <button className="text-gray-500">▲</button>
      <span>{upvotes}</span>
      <button className="text-gray-500 rotate-180">▲</button>
    </div>
    <div>
      <h2 className="font-semibold">{title}</h2>
      <p className="text-sm text-gray-500">
        {daysAgo} days ago | by {author} | {commentCount} comments
      </p>
    </div>
  </div>
)

export const LandingRoute = () => {
  return (
    <>
      <Head description="Welcome to DDD Forum" />
      <MainLayout>
        <div className="space-y-4">
          <PostItem
            upvotes={9}
            title='"Domain services vs Application services"'
            daysAgo={7}
            author="stemlerjs"
            commentCount={5}
          />
          <PostItem
            upvotes={3}
            title='"Ports and Adapters"'
            daysAgo={6}
            author="stemlerjs"
            commentCount={1}
          />
          <PostItem
            upvotes={2}
            title='"An Introduction to Domain-Driven Design - DDD w/ TypeScript"'
            daysAgo={7}
            author="stemlerjs"
            commentCount={0}
          />
        </div>
      </MainLayout>
    </>
  )
}
