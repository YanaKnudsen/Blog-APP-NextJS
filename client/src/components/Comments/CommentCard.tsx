"use client"

export default function CommentCard({comment}) {

    return (
        <div className="flex flex-col mb-5">
            <div className="flex flex-row justify-between">
                <div>
                    {comment.user.name}
                </div>
                <div>
                    {comment.createdAt.split("T")[0]}
                </div>
            </div>
            <div>
                {comment.content}
            </div>

        </div>
    );
}