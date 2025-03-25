import {useRef, useState} from "react";
import useInvalidValueFormContext from "../hooks/useInvalidValueFormContext";
import useMessageContext from "../hooks/useMessageContext";
import usePostsContext from "../hooks/usePostsContext";
import PostForm from "./PostForm";
import {PostType} from "../types/postType";
import postImage from "../api/postImage";
import {ImagePostType} from "../types/imagePostType";
import deleteImage from "../api/deleteImage";
import patchPost from "../api/patchPost";
import {isAxiosError} from "axios";
import {DragNDropStateType} from "../types/dragNDropStateType";

type EditPostFormProps = {
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
	post: PostType;
	newOptimisticPosts: (action: PostType[]) => void;
};

const EditPostForm = ({setShowModal, post, newOptimisticPosts}: EditPostFormProps) => {
	const {posts, setPosts} = usePostsContext();
	const {showMessage} = useMessageContext();
	const {setInvalidValues} = useInvalidValueFormContext();

	const [imageFile, setImageFile] = useState<File | null>(null);
	const imagePost = useRef<ImagePostType | null>(post.postImage);

	const [dragNDropState, setDragNDropState] = useState<DragNDropStateType>(post.postImage ? "success" : "standard");

	const editPost = async (formData: FormData) => {
		const postText = formData.get("postText")?.toString();

		if (!imagePost && !postText) {
			setDragNDropState("empty");
			setInvalidValues([
				{
					name: "postText",
					invalidMessage: "Чтобы отредактировать пост необходимо добавить изображение и/или текст",
				},
			]);

			setTimeout(() => setDragNDropState("standard"), 5000);
			setTimeout(() => setInvalidValues(null), 5000);
		} else {
			const optimisticPosts = posts.map((prevPost) => {
				if (prevPost.id === post.id) {
					return {
						...prevPost,
						text: postText,
						isPending: true,
						postImage: imageFile
							? {url: URL.createObjectURL(imageFile), fileName: imageFile.name, id: 1}
							: post.postImage && !imageFile
							? post.postImage
							: null,
					};
				}

				return prevPost;
			});

			newOptimisticPosts(optimisticPosts);

			setTimeout(() => setShowModal(false));
			setTimeout(() => showMessage({messageText: "Идёт редактирование поста...", type: "neutral"}));

			try {
				if (imageFile) {
					if (post.postImage) {
						const [responsePostImage] = await Promise.all([
							postImage(imageFile),
							deleteImage(post.postImage.id),
						]);

						imagePost.current = responsePostImage;
					} else {
						const responsePostImage = await postImage(imageFile);
						imagePost.current = responsePostImage;
					}

					setImageFile(null);
				}

				const responsePatch: PostType = await patchPost(post.id, postText, imagePost.current);

				setPosts((prevPosts) =>
					prevPosts.map((prevPost) =>
						prevPost.id === post.id
							? {...prevPost, text: responsePatch.text, postImage: responsePatch.postImage}
							: prevPost
					)
				);

				showMessage({messageText: "Пост успешно отредактирован!", type: "success"});
			} catch (error) {
				if (isAxiosError(error)) {
					if (error.response) {
						showMessage({
							messageText:
								"При редактировании поста произошла ошибка на стороне сервера. Мы уже работаем над проблемой",
							type: "error",
						});
					} else if (error.request) {
						showMessage({
							messageText: "Не удалось получить данные с сервера. Пожалуйста, повторите попытку позже",
							type: "error",
						});
					} else {
						showMessage({
							messageText: "Произошла непредвиденная ошибка",
							type: "error",
						});
					}
				} else {
					showMessage({
						messageText: "Произошла непредвиденная ошибка",
						type: "error",
					});
				}
			}
		}
	};

	return (
		<PostForm
			actionForm={editPost}
			setShowModal={setShowModal}
			imageFile={imageFile}
			setImageFile={setImageFile}
			dragNDropState={dragNDropState}
			setDragNDropState={setDragNDropState}
			submitButtonText='Сохранить'
			post={post}
		/>
	);
};

export default EditPostForm;
