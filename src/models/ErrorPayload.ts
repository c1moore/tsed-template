import { Property } from "@tsed/schema";

export default class ErrorPayload {
  @Property()
  message: string;
}
