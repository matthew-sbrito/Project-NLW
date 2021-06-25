import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { TagsRepositories } from "../repositories/TagsRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IComplimentRequest{
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

class CreateComplimentService{
  async execute({tag_id, user_sender, user_receiver, message}: IComplimentRequest){
    const complimentRepositories = getCustomRepository(ComplimentsRepositories);
    const userRepositories = getCustomRepository(UsersRepositories);
    const tagRepositories = getCustomRepository(TagsRepositories);
  
    if(user_sender === user_receiver){
      throw new Error("Incorrect User Receiver")
    }

    const userReceiverExists = await userRepositories.findOne(user_receiver)
    const userSenderExists = await userRepositories.findOne(user_sender)
    const tagExists = await tagRepositories.findOne(tag_id)

    if(!tagExists){
      throw new Error("Tag does not exists!")
    }
    
    if(!userSenderExists){
      throw new Error("User sender does not exists!")
    }

    if(!userReceiverExists){
      throw new Error("User receiver does not exists!")
    }

    const compliment = await complimentRepositories.create({
      tag_id,
      user_receiver,
      user_sender,
      message
    })

    await complimentRepositories.save(compliment)

    return compliment;
    
  }
}

export { CreateComplimentService }