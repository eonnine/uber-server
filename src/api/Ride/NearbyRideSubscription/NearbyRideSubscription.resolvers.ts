import { Resolvers } from "src/types/resolvers";
import { withFilter } from "graphql-yoga";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Subscription: {
    NearbyRideSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => {
          return pubSub.asyncIterator("rideRequest");
        },
        async(payload, _, { context }) => {
          const user: User = context.currentUser; //equal driver
          const { 
            NearbyRideSubscription : { pickUpLat, pickUpLng } 
          } = payload;
          const { lastLat: userLastLat, lastLng: userLastLng } = user;

          return(
            pickUpLat >= userLastLat - 0.05 &&
            pickUpLat <= userLastLat + 0.05 &&
            pickUpLng >= userLastLng - 0.05 &&
            pickUpLng <= userLastLng + 0.05
          )
        }
      )
    }
  }
}

export default resolvers;