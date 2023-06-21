import { useState } from "react";
import { useAuth } from "../../contexts/auth-context";
import { usePosts } from "../../contexts/post-context";
import { useUsers } from "../../contexts/user-context";
import {
  FaEdit,
  FaTrash,
  FaUserPlus,
  RiUserUnfollowFill,
} from "../../utils/icons";
import { PostModal } from "..";
import { useLocation, useNavigate } from "react-router-dom";

const PostOptionsModal = ({ post, setShowOptions }) => {
  const { _id, username } = post;
  const { currentUser } = useAuth();
  const {
    usersState: { users },
  } = useUsers();
  const { deletePostHandler } = usePosts();

  const [showPostModal, setShowPostModal] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const userToFollow = users.find((user) => user.username === username);

  const userAlreadyFollowing = userToFollow.followers.find(
    (user) => user.username === currentUser.username
  );

  return (
    <div className="absolute flex flex-col right-1 top-7 w-max rounded-md shadow-lg border border-darkGrey bg-lighterPrimary">
      {username === currentUser.username ? (
        <>
          <button
            className="py-2 px-4 text-left cursor-pointer rounded-md hover:bg-lightPrimary flex items-center justify-center"
            onClick={() => {
              setShowPostModal(true);
            }}
          >
            <FaEdit className="mr-2" />
            Edit
          </button>
          <button
            className="py-2 px-4 text-left cursor-pointer rounded-md hover:bg-lightPrimary text-red flex items-center justify-center"
            onClick={() => {
              deletePostHandler(_id);
              if (pathname !== "/") {
                setTimeout(() => {
                  navigate("/");
                  window.scroll({ top: 0, behavior: "smooth" });
                }, 2000);
              }
              setShowOptions((prev) => !prev);
            }}
          >
            <FaTrash className="mr-2 " />
            Delete
          </button>
        </>
      ) : (
        <button className="py-2 px-4 text-left cursor-pointer rounded-md hover:bg-lightPrimary flex items-center justify-center">
          {userAlreadyFollowing ? (
            <>
              <RiUserUnfollowFill className="mr-2 " /> Unfollow{" "}
            </>
          ) : (
            <>
              <FaUserPlus className="mr-2 " />
              Follow
            </>
          )}
        </button>
      )}

      {showPostModal ? (
        <div className="fixed top-0 left-0 w-full h-full z-90 flex justify-center items-center cursor-default bg-[#00000070] backdrop-blur-[1px]">
          <PostModal
            post={post}
            setShowOptions={setShowOptions}
            setShowPostModal={setShowPostModal}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export { PostOptionsModal };