import React from 'react'
import { Post } from '../../../atoms/postsAtom'

type PostItemProps = {
    post: Post;
}

const PostItem:React.FC<PostItemProps> =()=> {
  return (
    <div>PostItem</div>
  )
}

export default PostItem