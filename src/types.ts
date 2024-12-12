import { z } from "npm:zod";
import {
  ContactSchema,
  ContentSchema,
  MessageSchema,
  NotificationBodySchema,
  ProviderSchema,
  StatusSchema,
  StatusTypesSchema,
} from "./schemas.ts";

export type Provider = z.infer<typeof ProviderSchema>;
export type Contact = z.infer<typeof ContactSchema>;
export type Content = z.infer<typeof ContentSchema>;
export type NotificationBody = z.infer<typeof NotificationBodySchema>;
export type Message = z.infer<typeof MessageSchema>;
export type Status = z.infer<typeof StatusSchema>;
export type StatusTypes = z.infer<typeof StatusTypesSchema>;
