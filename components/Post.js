import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import ThumbUpOffAltRoundedIcon from "@mui/icons-material/ThumbUpOffAltRounded";
import { Avatar, IconButton } from "@mui/material";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import TimeAgo from "timeago-react";
import { modalState, modalTypeState } from "../atoms/modalAtom";
import { getPostState, handlePostState } from "../atoms/postAtom";

function Post({ post, modalPost }) {
  const { data: session } = useSession();
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  const [postState, setPostState] = useRecoilState(getPostState);
  const [handlePost, setHandlePost] = useRecoilState(handlePostState);
  const [showInput, setShowInput] = useState(false);
  const [liked, setLiked] = useState(false);

  const deletePost = async () => {
    const response = await fetch(`/api/posts/${post._id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    setHandlePost(true);
    setModalOpen(false);
  };

  const truncate = (string, n) =>
    string?.length > n ? string.substr(0, n - 1) + "... see more" : string;

  return (
    <div
      className={`bg-white dark:bg-gray-700 rounded-lg
            
            space-y-2 py-2.5 border border-gray-300 dark:border-none`}>
      <div className='flex items-center pl-2.5 cursor-pointer'>
        <Avatar
          src={session?.user?.image}
          className='!h10 !w-10 cursor-pointer'
        />
        <div className='mr-auto ml-2 leading-none'>
          <h3 className='font-medium hover:text-blue-500 hover:underline'>
            {post.username}
          </h3>
          <p className='text-sm opacity-70'>{post.email}</p>
          <TimeAgo
            datetime={post.createdAt}
            className='text-sm dark:text-white/75 opacity-80'
          />
        </div>
        {modalPost ? (
          <IconButton onClick={() => setModalOpen(false)}>
            <CloseRoundedIcon className='text-red-600 opacity-75 h-7 w-7' />
          </IconButton>
        ) : (
          <IconButton>
            <MoreHorizRoundedIcon className='opacity-70 h-7 w-6 text-gray-700 dark:text-gray-200' />
          </IconButton>
        )}
      </div>

      {post.input && (
        <div className='px-2.5 break-all md:break-normal'>
          {modalPost || showInput ? (
            <p onClick={() => setShowInput(false)} className='cursor-pointer'>
              {post.input} 
            </p>
          ) : (
            <p onClick={() => setShowInput(true)} className='cursor-pointer'>
              {truncate(post.input, 150)}
            </p>
          )}
        </div>
      )}

      {post.photoUrl && !modalPost && (
        <img
          src={post.photoUrl}
          alt='image'
          className='w-full cursor-pointer'
          onClick={() => {
            setModalOpen(true);
            setModalType("gifYouUp");
            setPostState(post);
          }}
        />
      )}

      <div className='flex items-center justify-evenly mx-2.5 pt-2 text-black/60 dark:text-white/75'>
        {modalPost ? (
          <button className='postButton'>
            <CommentOutlinedIcon />
            <h4>Comment</h4>
          </button>
        ) : (
          <button
            className={`postButton ${liked && "text-blue-500"}`}
            onClick={() => setLiked(!liked)}>
            {liked ? (
              <ThumbUpOffAltRoundedIcon className='scale-x-100' />
            ) : (
              <ThumbUpOffAltOutlinedIcon className='-scale-x-100' />
            )}
            <h4>Like</h4>
          </button>
        )}

        {session?.user?.email === post.email ? (
          <button
            className='postButton focus:text-red-600'
            onClick={deletePost}>
            <DeleteRoundedIcon />
            <p>DeletePost</p>
          </button>
        ) : (
          <button
            className='postButton focus:text-red-600'
            onClick={deletePost}>
            <ReplyRoundedIcon className='-scale-x-100' />
            <p>Share</p>
          </button>
        )}
      </div>
    </div>
  );
}

export default Post;
