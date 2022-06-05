//
export const buttonConstants = {
	CLEAR: "AC",
	FLIP: "+/-",
	DELETE: "DEL",
	DIVIDE: "/",
	SEVEN: "7",
	EIGHT: "8",
	NINE: "9",
	MULTIPLY: "*",
	FOUR: "4",
	FIVE: "5",
	SIX: "6",
	SUBTRACT: "-",
	ONE: "1",
	TWO: "2",
	THREE: "3",
	PLUS: "+",
	ZERO: "0",
	DECIMAL: ".",
	EQUALS: "=",
};

Object.freeze(buttonConstants);

// Helper Array to map out the buttons. Can be changed into an array of objects if needed!
export const buttonValues = [
	buttonConstants.CLEAR,
	buttonConstants.FLIP,
	buttonConstants.DELETE,
	buttonConstants.DIVIDE,
	buttonConstants.SEVEN,
	buttonConstants.EIGHT,
	buttonConstants.NINE,
	buttonConstants.MULTIPLY,
	buttonConstants.FOUR,
	buttonConstants.FIVE,
	buttonConstants.SIX,
	buttonConstants.SUBTRACT,
	buttonConstants.ONE,
	buttonConstants.TWO,
	buttonConstants.THREE,
	buttonConstants.PLUS,
	buttonConstants.ZERO,
	buttonConstants.DECIMAL,
	buttonConstants.EQUALS,
];

export const BLANK = "\u00A0";
export const operators = [
	buttonConstants.PLUS,
	buttonConstants.SUBTRACT,
	buttonConstants.MULTIPLY,
	buttonConstants.DIVIDE,
];
Object.freeze(operators);
