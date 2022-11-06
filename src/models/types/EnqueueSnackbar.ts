import { OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";

export type EnqueueSnackbar = (
  message: SnackbarMessage,
  options?: OptionsObject | undefined
) => SnackbarKey;
