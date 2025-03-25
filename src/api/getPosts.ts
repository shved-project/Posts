import axios, {isAxiosError} from "axios";
import {PostType} from "../types/postType";

const getPosts = async (): Promise<PostType[] | string> => {
	try {
		const posts = await axios.get<PostType[]>("https://1b6f506abeed4f2b.mokky.dev/posts", {
			headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
		});

		return posts.data.reverse();
	} catch (error) {
		if (isAxiosError(error)) {
			if (error.response) {
				return "Произошла ошибка на стороне сервера. Мы уже работаем над проблемой";
			} else if (error.request) {
				return "Не удалось получить данные с сервера. Пожалуйста, повторите попытку позже";
			} else {
				return "Произошла непредвиденная ошибка";
			}
		} else {
			return "Произошла непредвиденная ошибка";
		}
	}
};

export default getPosts;
