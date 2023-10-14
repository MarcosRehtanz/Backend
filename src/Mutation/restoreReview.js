import { models } from "../db.js";

export const restoreReview = async (_, args) => {
  const { idReview, title } = args
  try {

    const restoredReview = await models.Review.restore({where: idReview})

    if (!restoredReview) {
      throw new Error('Esta reseña no existe o ya ha sido restaurada')
    }
    else {
      console.log(restoredReview, 'He vuelto del más allá ciela')
      return `Tu reseña ${title} ha sido restaurada`
    }
  } 
  catch (error) {
    throw new Error('Error al restaurar la reseña: ' + error.message);
  }
};
