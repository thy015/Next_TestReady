import axios from 'axios'

export class TestApi {
  //   GET
  async getPart1Image() {
    const image = await axios.get(
      '\thttps://toeic.vocabuniverse.com/test/659360dd0cf64b41298cf5ae/image/2.png',
      { responseType: 'arraybuffer' }
    )
    return image.data
  }

  async getQuestion(){

  }

}
