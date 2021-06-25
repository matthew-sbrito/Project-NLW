import { Request, Response, NextFunction} from "express"
import { verify } from "jsonwebtoken";

interface IPayload{
  sub: string;
}

export function ensureAuthenticated(
  request: Request, 
  response: Response,
  next: NextFunction
){  

  //Recebe o token
  const authToken = request.headers.authorization;

  // Validar se o token esta preenchido
  if(!authToken){
    // return response.status(401).end()
    return response.status(401).json({message: "Token missing"})
  }

  const [, token] = authToken.split(" ");

  // Validar se o token é válido
  try {
    const { sub } = verify(token, "65a4sdd5asd5a518sd5a1khgj6") as IPayload;

    // Recuperar informação do usuário
    request.user_id = sub;
    return next();

  }catch(error) {
    return response.status(401).json({message: "Token missing"})
  }
}