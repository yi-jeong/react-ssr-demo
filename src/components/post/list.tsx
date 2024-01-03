import React from "react";
import {useQuery} from "@tanstack/react-query";

export interface Post{
    id: number,
    author: string,
    url: string,
    download_url: string
}

async function getPostList(){
    try {
        const response = await fetch("https://picsum.photos/v2/list?page=2&limit=100", { method: "GET" });

        if (!response.ok) {
            throw new Error(`에러: ${response.status} - ${response.statusText}`);
        }

        return response.json();
    } catch (error) {
        throw new Error(`데이터를 불러오는 중 에러 발생`);
    }
}

function PostSkeleton(){
    return (
        <div className="group relative animate-pulse">
            <div
                className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <div className="rounded-full bg-slate-200 h-10 w-10"></div>
            </div>
            <div className="mt-4 flex justify-between">
                <div className="flex-1 space-y-3 py-1">
                    <h3 className="text-sm text-gray-700">
                        <div className="h-3 bg-slate-200 rounded col-span-2"></div>
                    </h3>
                    <div className="h-3 bg-slate-200 rounded col-span-2 w-60"></div>
                    <div className="h-3 bg-slate-200 rounded w-40"></div>
                </div>

            </div>
        </div>
    )
}

function PostComponent({ props }: { props: Post }){
    return(
        <div className="group relative">
            <div
                className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                    src={props.download_url}
                    alt={"Test"}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
            </div>
            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm text-gray-700">
                        <a href={props.download_url}>
                            <span aria-hidden="true" className="absolute inset-0"/>
                            {props.author}
                        </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{props.author}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{props.url}</p>
            </div>
        </div>
    )
}

export default function PostList(){
    const { data, isError, isLoading } = useQuery<Post[]>({
        queryKey: ['posts'],
        queryFn: getPostList
    });

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">테스트용 API 데이터 리스트</h2>
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {
                        isLoading &&
                        Array.from({length: 7}, (_, i) => <PostSkeleton key={i}/>)
                    }
                    {
                        data && data.map(post => <PostComponent key={post.id} props={post}/>)
                    }
                </div>
            </div>
        </div>
    )
}