import { models } from "../db.js";

export const deleteReview = async (_, {idReview}) =>{
    try{
        const review = await models.Review.findByPk(idReview)
        if(!review){
            throw Error('La reseña que desea eliminar no existe')
        }
        else{
            await review.destroy()
            return 'El review ha sido eliminado'
        }
    }
    catch(error){
        throw new Error('No se ha podido eliminar esta reseña ' + error.message)
    }

}