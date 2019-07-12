import { Resolvers } from "src/types/resolvers";
import privateResolver from "../../../utils/resolverMiddleware";
import User from "../../../entities/User";
import { GetNearbyRideResponse } from "src/types/graph";
import { getRepository, Between } from "typeorm";
import Ride from "../../../entities/Ride";

const resolvers: Resolvers = {
  Query: {
    GetNearbyRide: privateResolver(
      async(
        _,
        __,
        { req }
      ): Promise<GetNearbyRideResponse> => {
        const user: User = req.user;
        const { lastLat, lastLng } = user;
        try {
          const ride = await getRepository(Ride).findOne({
            status: "REQUESTING",
            pickUpLat: Between(lastLat - 0.05, lastLat + 0.05),
            pickUpLng: Between(lastLng - 0.05, lastLng + 0.05)
          })
          if(ride){
            return {
              ok: true,
              error: null,
              ride: ride
            }
          } else {
            return {
              ok: true,
              error: null,
              ride: null
            }
          }
        } catch(error) {
          return {
            ok: false,
            error: error.message,
            ride: null
          }
        }
      }
    )
  }
}

export default resolvers;