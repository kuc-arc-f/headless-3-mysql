//
const LibTest = {
  getTest : async function(){
    try {
      let url = process.env.BASE_URL;
//      url += '/api/get/find?content=posts&apikey=z0IStFXrZOcrpTm0WlmVgRWC&skip=10&take=10';
      url += '/api/get/find?content=posts&apikey=z0IStFXrZOcrpTm0WlmVgRWC';
console.log(url);
      const res = await fetch(url)
      const json = await res.json()
console.log(json);
    } catch (err) {
      throw new Error('Error , get_show_item');
    }          
  },  
}
export default LibTest;
