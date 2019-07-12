import { Resolvers } from "src/types/resolvers";
import privateResolver from "../../../utils/resolverMiddleware";
import { UpdateMyProfileMutationArgs, UpdateMyProfileResponse } from "src/types/graph";
import User from "../../../entities/User";
import cleanNullArgs from "../../../utils/cleanNullArgs";

const resolvers: Resolvers = {
  Mutation: {
    UpdateMyProfile: privateResolver(
      async(
        _,
        args: UpdateMyProfileMutationArgs,
        { req }
      ): Promise<UpdateMyProfileResponse> => {
        const user: User = req.user;
        const notNull:any = cleanNullArgs(args);
        try {
          if(args.password !== null){
            user.password = args.password;
            user.save();
            delete notNull.password;
          }
          await User.update({ id:user.id }, { ...notNull });
          return {
            ok: true,
            error: null
          };
        } catch(error) {
          return {
            ok: false,
            error: error.message
          };
        }
      }
    )
  }
}

export default resolvers;