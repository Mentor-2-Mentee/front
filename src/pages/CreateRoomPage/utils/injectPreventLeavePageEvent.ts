export const injectPreventLeavePageEvent = (event: BeforeUnloadEvent) => {
  event.preventDefault();
  event.returnValue = "";
};
