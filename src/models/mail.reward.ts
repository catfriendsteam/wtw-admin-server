export class Reward {
  type: RewardType;
  degree: number;
  constructor(type: RewardType, degree: number) {
    this.type = type;
    this.degree = degree;
  }
}

export enum RewardType {
  Money,
  Dia,
  Heart,
  NyanCoin,
  FriendShip,
  NyanTicket,
  NyanPae,
  Jokbo,
  StaminaDrink,
  RodAndBall,
  Mail, //공지
  OpenMail,
  Daily_7,
  Daily_30,
  Limit_1,
  Limit_2,
  Buff_1,
  Buff_2,
  Buff_3,
  Box_100,
}
export default Reward;
