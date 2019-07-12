import User from "../../../entities/User";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/resolverMiddleware";
import { ToggleDrivingModeResponse } from "src/types/graph";

const resolvers: Resolvers = {
  Mutation: {
    ToggleDrivingMode: privateResolver(
      async(
        _,
        __,
        { req }
      ): Promise<ToggleDrivingModeResponse> => {
        const user: User = req.user;
        user.isDriving = !user.isDriving;
        user.save();
        try {
          return {
            ok: true,
            error: null
          }
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