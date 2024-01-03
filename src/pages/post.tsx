import React, {Suspense} from "react";
import PostList from "../components/post/list";

export default function PostPage(){
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PostList />
        </Suspense>
    )
}