import { Head } from '@/components/seo'
import { PostsList } from '@/features/posts/components/posts-list'

export const LandingRoute = () => {
  return (
    <>
      <Head description="Welcome to DDD Forum" />
      <PostsList />
    </>
  )
}
