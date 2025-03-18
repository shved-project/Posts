import {duration} from "./variables";

export const showToUpVariant = {
	visible: {
		opacity: 1,
		y: 0,

		transition: {
			duration: duration,
		},
	},
	hidden: {
		opacity: 0,
		y: 10,
	},
};

export const staggerVariant = {
	visible: {
		transition: {
			staggerChildren: 0.15,
		},
	},
};
