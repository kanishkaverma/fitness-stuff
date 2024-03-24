import PocketBase from 'pocketbase';
import fs from 'node:fs';

const pb = new PocketBase('http://127.0.0.1:8090');
await pb.admins.authWithPassword('kanisverma@gmail.com', 'Kanishkarox1!');

 let data = fs.readFileSync('../myfitnesspal_data/data.csv', 'utf8');
 data = data.split('\r\n')

data  =  data.map((x, i)=>{
return x.split(',')
})


for (const record of data)  {
if (record[0] === "name")  continue
const dbrecord = await pb.collection('food').create({
	name : record[0],
	quantity: record[1],
	unit: record[2],
	carbohydrates: record[3],
	protein: record[4],
	fat : record[5],
	calories : record[6]
});
}
