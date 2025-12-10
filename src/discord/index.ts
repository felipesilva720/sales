import { setupCreators } from "#base";
import { zodErrorHandler } from "#functions";
import { ZodError } from "zod";

export const { createCommand, createEvent, createResponder } = setupCreators({
  responders: {
    async onError(error, interaction) {
      if (error instanceof ZodError) {
        await zodErrorHandler(error, interaction);
        return;
      }
    },
  },
});
