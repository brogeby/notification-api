import { z } from "npm:zod";

export const ProviderSchema = z.enum(["teams", "email", "slack"]);

export const ContactSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  teams_url: z.string().url().optional(),
  slack_url: z.string().url().optional(),
});

export const ContentSchema = z.object({
  subject: z.string(),
  body: z.string(),
});

export const NotificationBodySchema = z.object({
  providers: z.array(ProviderSchema),
  contact: ContactSchema,
  content: ContentSchema,
  run_after: z.string().optional(),
  product: z.record(z.string()),
});

export const StatusTypesSchema = z.enum(["success", "failed", "pending"]);

export const MessageSchema = z.object({
  id: z.number(),
  name: z.string(),
  payload: z.string(),
  handled: z.boolean(),
  created_at: z.date(),
  run_after: z.date().nullable(),
  status: StatusTypesSchema,
});

export const StatusSchema = z.object({
  status: StatusTypesSchema,
  message_id: z.number(),
  notification_id: z.number(),
});
