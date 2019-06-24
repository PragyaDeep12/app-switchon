import User from "./User";

export default interface RequestMessage {
  message?: string | null;
  userTo?: User | null;
  state?: string | null;
  userFrom?: User | null;
  department?: string | null;
  time?: Date | null;
}
