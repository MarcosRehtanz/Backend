import { models } from "../db.js";

export const restoreReview = async (_, { idReview }) => {
  try {

    const restoredReview = await models.Review.findByPk(idReview, { paranoid: false })

    if (!restoredReview) {
      throw new Error('Esta reseña no existe o ya ha sido restaurada')
    }
    else {
      console.log(restoredReview)
      return restoredReview
    }
  } 
  catch (error) {

    throw new Error('Error al restaurar la reseña: ' + error.message);
  }
};
