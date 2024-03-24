import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");
pb.autoCancellation(false)

export async function getFoodData(name) {
	try {
		console.log(name)
		const resultList = await pb.collection("food").getList(1, 50, {
			filter: `created >= "2022-01-01 00:00:00" && name ~ "${name}"`,
		});
		return resultList
	} catch (e) {console.log(e)
	console.log(e.originalError)
	}
}
