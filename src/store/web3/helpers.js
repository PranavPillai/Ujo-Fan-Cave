import axios from 'axios';
import { API_ENDPOINT } from '../../constants/endPoints';

export const fetchBadgeData = async (staleCid, badgeState, txHash = null) => {
  let returnObj = {};
  // if the server doesn't have the cid, we fallback to ipfs
  try {
    const { data: { cid, id, members, image, description, name } } =
      await axios.get(`${API_ENDPOINT}/musicgroups/cid/${staleCid}`);
    returnObj.cid = cid;
    returnObj.id = id;
    returnObj.name = name;
    returnObj.members = members;
    returnObj.image = image;
    returnObj.description = description;
  } catch (err) {
    // if the server doesnt have the cid, the badge was bought elsewhere, so we use old cid
    //console.log(err);
  }
  if (badgeState === 'pending') returnObj.txHash = txHash;
  returnObj.state = badgeState;
  return returnObj;
};

// collects badges that are of the same MG, uses ID as key for returnObj
export const prepareBadgesForRedux = (badgeArray) => {
  const returnObj = {};
  badgeArray.forEach((badge) => {
    if (badge.id) {
      const { id } = badge;
      if (returnObj[id]) {
        returnObj[id].count += 1;
  
        // ensure we don't overwrite any pending badges
        if (badge.state === 'pending') {
          returnObj[id].txHash = badge.txHash;
          returnObj[id].state = 'pending';
        }
      } else {
        returnObj[id] = badge;
        returnObj[id].count = 1;
      }
    }
  });
  return returnObj;
};
