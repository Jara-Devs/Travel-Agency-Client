import { message } from "antd";
import { Offer, ReactionState } from "../../types/offers";
import { User } from "../../types/auth";
import { reaction } from "../../api/offers";

export const reactionLogic = async (
    offer: Offer,
    setOffer: (offer: Offer) => void,
    user: User | null,
    reactionState: ReactionState
  ) => {
    const { create, edit, remove } = reaction();
    if (user?.role !== "Tourist")
      return message.error("Only tourists can react to offers");
  
    const touristId = user?.id!;
  
    const reactionV = offer.reactions?.find((x) => x.touristId === touristId);
    let changed = false;
  
    if (reactionV && reactionV.reactionState === reactionState) {
      const result = await remove(reactionV.id);
  
      if (result.ok) {
        offer.reactions = offer.reactions?.filter((x) => x.id !== reactionV.id);
        changed = true;
      } else message.error(result.message);
    }
  
    if (!reactionV) {
      const result = await create({
        offerId: offer.id,
        reactionState,
        touristId,
      });
      if (result.ok) {
        offer.reactions.push({
          id: (result.value as any).id,
          reactionState,
          touristId,
          offerId: offer.id,
        });
        changed = true;
      } else message.error(result.message);
    }
  
    if (reactionV && reactionV.reactionState !== reactionState) {
      const result = await edit(
        { reactionState, touristId, offerId: offer.id },
        reactionV.id
      );
      if (result.ok) {
        offer.reactions = offer.reactions?.map((x) =>
          x.id === reactionV.id ? { ...x, reactionState } : x
        );
        changed = true;
      } else message.error(result.message);
    }
  
    if (changed) setOffer(offer);
  };
  
  export const selectedReaction = (
    user: User | null,
    offer: Offer,
    reactionState: ReactionState
  ) => {
    if (user?.role !== "Tourist") return false;
    const touristId = user?.id!;
  
    const reaction = offer.reactions?.find((x) => x.touristId === touristId);
  
    if (reaction) return reaction.reactionState === reactionState;
  
    return false;
  };