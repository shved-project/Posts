import {useEffect, useRef, useState} from "react";
import Button from "./Button";
import Input from "./Input";
import {PostType} from "../types/postType";

type PostFormProps = {
	actionForm: (formData: FormData) => Promise<void>;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
	imageFile: File | null;
	setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
	dragNDropState: "standard" | "success" | "dragenter" | "empty" | "error";
	setDragNDropState: React.Dispatch<React.SetStateAction<"standard" | "success" | "dragenter" | "empty" | "error">>;
	submitButtonText: string;
	post?: PostType;
};

const PostForm = ({
	actionForm,
	setShowModal,
	imageFile,
	setImageFile,
	dragNDropState,
	setDragNDropState,
	submitButtonText,
	post,
}: PostFormProps) => {
	const [postText, setPostText] = useState<string>(post?.text ? post.text : "");
	const [fileName, setFileName] = useState<string | undefined>(post?.postImage?.fileName);

	const fileInputRef = useRef<HTMLInputElement>(null!);
	const submitButtonRef = useRef<HTMLButtonElement>(null!);

	const colorDragNDropBlock = {
		standard: "text-gray-700",
		success: "text-green-500",
		dragenter: "text-green-700",
		empty: "text-red-500",
		error: "text-red-500",
	};

	useEffect(() => {
		const events = ["dragover", "drop"];

		const preventDefaultDragNDrop = (event: Event) => {
			event.preventDefault();
		};

		events.forEach((event) => {
			document.addEventListener(event, preventDefaultDragNDrop);
		});

		return () => {
			events.forEach((event) => {
				document.removeEventListener(event, preventDefaultDragNDrop);
			});
		};
	}, []);

	const handleClickAddImg = () => {
		fileInputRef.current.click();
	};

	const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
		const image = event.dataTransfer.files[0];

		if (image.type.startsWith("image")) {
			setImageFile(image);
			setFileName(image.name);
			setDragNDropState("success");
		} else {
			setImageFile(null);
			setFileName(undefined);
			setDragNDropState("error");
			setTimeout(() => setDragNDropState("standard"), 5000);
		}
	};
	const handleDragEnter = () => {
		setDragNDropState("dragenter");
	};
	const handleDragLeave = () => {
		if (imageFile) {
			setDragNDropState("success");
		} else {
			setDragNDropState("standard");
		}
	};
	const handleChangeFileInput = () => {
		if (fileInputRef.current.files) {
			const image = fileInputRef.current.files[0];

			if (image.type.startsWith("image")) {
				setImageFile(image);
				setFileName(image.name);
				setDragNDropState("success");
			} else {
				setImageFile(null);
				setDragNDropState("error");
				setTimeout(() => setDragNDropState("standard"), 5000);
			}
		}
	};

	const handleChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setPostText(event.target.value);
	};

	return (
		<form action={actionForm}>
			<div
				className={`flex flex-col items-center justify-center relative border-2 border-dashed aspect-[16/9] cursor-pointer p-4 ${colorDragNDropBlock[dragNDropState]}`}
			>
				<div
					className='absolute inset-0'
					onClick={handleClickAddImg}
					onDrop={handleDrop}
					onDragEnter={handleDragEnter}
					onDragLeave={handleDragLeave}
				></div>
				<svg
					version='1.0'
					xmlns='http://www.w3.org/2000/svg'
					width='150'
					height='150'
					viewBox='0 0 512.000000 512.000000'
					preserveAspectRatio='xMidYMid meet'
					className='max-sm:w-27 max-sm:h-auto'
				>
					<metadata>Created by potrace 1.16, written by Peter Selinger 2001-2019</metadata>
					<g
						transform='translate(0.000000,512.000000) scale(0.100000,-0.100000)'
						fill='currentColor'
						stroke='none'
					>
						<path
							d='M1737 4570 c-72 -13 -166 -61 -219 -113 -85 -82 -125 -164 -143 -289
l-6 -48 -434 0 c-276 0 -453 -4 -487 -11 -188 -39 -362 -200 -423 -392 l-25
-78 0 -1307 c0 -1434 -3 -1350 61 -1481 40 -82 142 -185 231 -234 36 -21 100
-46 143 -57 77 -20 112 -20 2124 -20 1737 0 2056 3 2114 15 152 32 305 150
379 291 72 137 68 45 68 1489 0 1433 3 1353 -62 1479 -48 91 -167 205 -259
249 -41 19 -98 40 -127 46 -34 7 -212 11 -492 11 l-440 0 0 38 c0 127 -86 271
-208 349 -110 71 -60 67 -947 69 -440 1 -822 -2 -848 -6z m1617 -268 c92 -32
126 -106 126 -274 0 -90 14 -124 64 -154 29 -18 64 -19 561 -24 512 -5 532 -6
575 -26 57 -27 122 -92 152 -152 l23 -47 0 -1285 0 -1285 -33 -67 c-38 -78
-94 -129 -172 -159 -49 -19 -101 -19 -2090 -19 -1989 0 -2041 0 -2090 19 -78
30 -134 81 -172 159 l-33 67 -3 1235 c-3 1256 -1 1324 34 1392 26 49 85 108
138 136 l51 27 535 5 535 5 33 23 c50 36 56 57 62 192 5 111 9 129 30 162 27
40 66 67 114 79 17 4 364 7 771 8 673 0 744 -1 789 -17z'
						/>
						<path
							d='M4235 3531 c-218 -57 -250 -350 -50 -454 60 -31 156 -30 220 3 129
67 169 238 82 358 -53 75 -165 116 -252 93z'
						/>
						<path
							d='M2350 3514 c-387 -70 -714 -321 -879 -675 -151 -322 -148 -707 10
-1034 355 -740 1346 -905 1930 -323 337 337 441 846 264 1297 -104 266 -319
498 -583 630 -88 44 -221 87 -327 105 -109 19 -311 19 -415 0z m395 -280 c159
-31 346 -129 464 -246 118 -116 205 -266 249 -427 35 -132 37 -345 4 -466 -90
-326 -335 -571 -668 -667 -67 -19 -103 -23 -234 -23 -131 0 -167 4 -234 23
-365 105 -617 381 -681 748 -26 151 -13 305 40 456 99 283 329 502 612 583
154 44 284 50 448 19z'
						/>
					</g>
				</svg>
				<p className='text-center'>
					{dragNDropState === "standard" && (
						<>
							Перетащите фотографию
							<br />
							Или нажмите сюда для выбора файла с устройства
						</>
					)}
					{dragNDropState === "success" && (
						<>
							Вы добавили файл
							<br />
							{fileName}
						</>
					)}
					{dragNDropState === "dragenter" && (
						<>
							Отпустите кнопку мыши
							<br />
							чтобы загрузить файл
						</>
					)}
					{dragNDropState === "empty" && (
						<>
							Чтобы загрузить пост
							<br />
							необходимо добавить изображение и/или текст
						</>
					)}
					{dragNDropState === "error" && (
						<>
							Поддерживаются только картинки.
							<br />
							Файл не был загружен
						</>
					)}
				</p>
				<input
					type='file'
					name='image'
					className='hidden'
					ref={fileInputRef}
					onChange={handleChangeFileInput}
				/>
			</div>
			<div className='mt-8'>
				<Input
					textarea
					label='Текст поста'
					name='postText'
					autoFocus
					className='resize-none aspect-[16/5] max-sm:aspect-[16/9]'
					placeholder='Напишите здесь что-нибудь'
					onKeyDown={(event) => {
						if (event.key === "Enter") {
							submitButtonRef.current.click();
						}
					}}
					onChange={handleChangeText}
					value={postText}
				/>
			</div>
			<div className='flex items-center gap-3 justify-end mt-10'>
				<Button bgColor='blue' type='button' onClick={() => setShowModal(false)}>
					Отменить
				</Button>
				<Button bgColor='green' type='submit' ref={submitButtonRef}>
					{submitButtonText}
				</Button>
			</div>
		</form>
	);
};

export default PostForm;
