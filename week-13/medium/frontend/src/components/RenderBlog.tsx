import { AppBar } from "./AppBar"
import { Blog } from "../hooks"

export const RenderBlog = ({blog}: {blog: Blog}) => {
    return <div>
        <AppBar/>
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-2xl">
                <div className=" col-span-8">
                    <div className="text-5xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-4">
                        Post on 2nd December
                    </div>
                    <div className="pt-4">
                        {blog.content}
                    </div>
                </div>
                <div className=" col-span-4">
                    hello
                </div>
            </div>
        </div>
    </div>
}