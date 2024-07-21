import { queryOptions, useQuery } from '@tanstack/react-query'

import { api } from '@/lib/api-client'
import { QueryConfig } from '@/lib/react-query'
import { Post } from '@/types/api'

type GetPostsResponse = { posts: Post[] }

export const getPosts = (): Promise<GetPostsResponse> => {
  return api.get(`/posts`, {
    params: {
      sort: 'recent',
    },
  })
}

export const getPostsQueryOptions = () => {
  return queryOptions({
    queryKey: ['posts', 'recent'],
    queryFn: () => getPosts(),
  })
}

type UsePostsOptions = {
  queryConfig?: QueryConfig<typeof getPosts>
}

export const usePosts = ({ queryConfig }: UsePostsOptions = {}) => {
  return useQuery({
    ...getPostsQueryOptions(),
    ...queryConfig,
  })
}
