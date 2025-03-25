import {useRef, useState} from "react";
import {isAxiosError} from "axios";
import useAuthContext from "../hooks/useAuthContext";
import {PostType} from "../types/postType";
import useInvalidValueFormContext from "../hooks/useInvalidValueFormContext";
import useMessageContext from "../hooks/useMessageContext";
import {v4 as uuidv4} from "uuid";
import postImage from "../api/postImage";
import createPost from "../api/createPost";
import usePostsContext from "../hooks/usePostsContext";
import PostForm from "./PostForm";
import {ImagePostType} from "../types/imagePostType";
import {DragNDropStateType} from "../types/dragNDropStateType";
import {flushSync} from "react-dom";

type CreatePostFormProps = {
	newOptimisticPosts: (action: PostType[]) => void;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreatePostForm = ({newOptimisticPosts, setShowModal}: CreatePostFormProps) => {
	const {user} = useAuthContext();
	const {posts, setPosts} = usePostsContext();
	const {setInvalidValues} = useInvalidValueFormContext();
	const {showMessage} = useMessageContext();

	const [imageFile, setImageFile] = useState<File | null>(null);
	const imagePost = useRef<ImagePostType | null>(null);

	const [dragNDropState, setDragNDropState] = useState<DragNDropStateType>("standard");

	const addPost = async (formData: FormData) => {
		const postText = formData.get("postText")?.toString();

		if (!imageFile && !postText) {
			setDragNDropState("empty");
			setInvalidValues([
				{name: "postText", invalidMessage: "Чтобы загрузить пост необходимо добавить изображение и/или текст"},
			]);

			setTimeout(() => setDragNDropState("standard"), 5000);
			setTimeout(() => setInvalidValues(null), 5000);
		} else {
			const optimisticPost: PostType = {
				id: uuidv4(),
				user_id: user!.id,
				avatar: user!.avatar,
				name: `${user!.firstName} ${user!.lastName}`,
				postImage: imageFile ? {url: URL.createObjectURL(imageFile), fileName: imageFile.name, id: 1} : null,
				text: postText,
				isPending: true,
			};

			newOptimisticPosts([optimisticPost, ...posts]);

			// Обернули в flushSync, чтобы мгновенно изменить состояние
			flushSync(() => {
				setShowModal(false);
				showMessage({messageText: "Идёт загрузка поста...", type: "neutral"});
			});

			try {
				if (imageFile) {
					const responseUploads = await postImage(imageFile);
					imagePost.current = responseUploads;
					setImageFile(null);
				}

				const readyPost: PostType = {...optimisticPost, isPending: false, postImage: imagePost.current};
				const responsePosts = await createPost(readyPost);

				setPosts([responsePosts, ...posts]);

				showMessage({messageText: "Пост успешно загружен!", type: "success"});
			} catch (error) {
				if (isAxiosError(error)) {
					if (error.response) {
						showMessage({
							messageText:
								"При загрузке поста произошла ошибка на стороне сервера. Мы уже работаем над проблемой",
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
			actionForm={addPost}
			setShowModal={setShowModal}
			imageFile={imageFile}
			setImageFile={setImageFile}
			dragNDropState={dragNDropState}
			setDragNDropState={setDragNDropState}
			submitButtonText='Создать'
		/>
	);
};

export default CreatePostForm;
