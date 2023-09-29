import jwt from 'jsonwebtoken';

const getUser = async (token) => {
    try {
      if (token) {
        const tokenVerify = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        return tokenVerify;
      }
      return null;
    } catch (error) {
      return null;
    }
  };

  const context = async ({req})=>{
    try {
        const token = req.headers.authorization || '';

    const tokenVerify = await getUser(token);
    if(!tokenVerify) throw new Error (error.message)

    return {tokenVerify}

    } catch (error) {
        throw new Error (error.message)
    }
    
  }

  export default context;