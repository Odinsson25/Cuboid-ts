import { CheckType } from "../Enums/Profanity";
export default async (
	str: string,
	arr: string[],
	method = CheckType.Partial || CheckType.Strict
) => {
	if (!arr || !str || !method) return false;
	str = str.toLowerCase();
	const strArr: string[] = str.split(" ");

	if (method === CheckType.Partial) {
		for (const a of arr) {
			for await (const strP of strArr) {
				if (strP.includes(a)) return true;
			}
		}
	}
	if (method === CheckType.Strict) {
		for await (const strP of strArr) {
			if (arr.includes(strP)) return true;
		}
	}
	return false;
};
