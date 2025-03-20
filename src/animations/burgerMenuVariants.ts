import {duration} from "./variables";

const durationBurger = duration / 2;

export const burgerTopLineVariant = {
	opened: {
		y: 0,
		rotate: 45,
		transition: {
			duration: durationBurger,
			y: {duration: durationBurger},
			rotate: {duration: durationBurger, delay: durationBurger},
		},
	},
	closed: {
		y: -10,
		rotate: 0,
		transition: {
			duration: durationBurger,
			y: {duration: durationBurger, delay: durationBurger},
			rotate: {duration: durationBurger},
		},
	},
};
export const burgerCenterLineVariant = {
	opened: {opacity: 0, transition: {duration: 0, delay: durationBurger}},
	closed: {opacity: 1, transition: {duration: 0, delay: durationBurger}},
};
export const burgerBottomLineVariant = {
	opened: {
		y: 0,
		rotate: -45,
		transition: {
			duration: durationBurger,
			y: {duration: durationBurger},
			rotate: {duration: durationBurger, delay: durationBurger},
		},
	},
	closed: {
		y: 10,
		rotate: 0,
		transition: {
			duration: durationBurger,
			y: {duration: durationBurger, delay: durationBurger},
			rotate: {duration: durationBurger},
		},
	},
};

export const burgerMenuVariant = {
	opened: {opacity: 1, scale: 1, y: 0, transition: {duration: durationBurger}},
	closed: {opacity: 0, scale: 0.75, y: -30, transition: {duration: durationBurger}},
};
