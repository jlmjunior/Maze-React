import axios from 'axios';

export const sendMaze = async (matriz, url) => {
  if (matriz === null || matriz === undefined) return null

  let apiUrl = url
  let startY = null
  let startX = null
  let endY = null
  let endX = null

  matriz.forEach((y,yIndex) => {
    y.forEach((x,xIndex) => {
      if (x === 2) {
        startY = yIndex
        startX = xIndex
      } else if (x === 3){
        endY = yIndex
        endX = xIndex
      }
    })
  })

  if(startY != null && startX != null && endY != null && endX != null) {
    return await conexao(startY, startX, endY, endX, url, apiUrl)
  }

  return null    
}

const conexao = async (startY, startX, endY, endX, url) => {
  let link = `https://localhost:44342/api/Maze/${url}?startY=${startY}&startX=${startX}&endY=${endY}&endX=${endX}`

  return await axios.get(link);
};

