import {
  createLabel,
  createModalFields,
  createTextInput,
} from "@magicyan/discord";
import { ModalBuilder, TextInputStyle } from "discord.js";

export function createModal() {
  return new ModalBuilder({
    customId: "create/product",
    title: "Criação de Produto",
    components: createModalFields(
      createLabel({
        label: "ID",
        description: "Por favor, informe um ID para o produto",
        component: createTextInput({
          customId: "id",
          minLength: 1,
          maxLength: 10,
          style: TextInputStyle.Short,
          required,
        }),
      })
    ),
  });
}
