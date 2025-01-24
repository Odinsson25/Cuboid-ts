import { request } from "undici";
export default async (url: string, returnType: number | string) => {
	const stringTypes: (string | number)[] = [
		"string",
		"str",
		"s",
		"text",
		"txt",
		"t",
		1,
	];
	const jsonTypes: (string | number)[] = ["jsson", "object", "j", "o", 0];

	const a = await request(url);
	if (!returnType || jsonTypes.includes(returnType)) return a.body.json();
	if (stringTypes.includes(returnType))
		return JSON.stringify(a.body.json(), null, " ");
};
