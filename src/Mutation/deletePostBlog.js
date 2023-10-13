import { models } from "../db.js";

export const deletePostBlog = async (_, { id }) => {
    console.log(id);
    try {
        const post = await models.Blog.findByPk(id)
        if (!post) {
            throw Error('El post que desea eliminar no existe')
        } else {
            await post.destroy()
            return 'El post ha sido eliminado'
        }
    } catch (error) {
        throw new Error('No se ha podido eliminar este post ' + error.message)
    }

}