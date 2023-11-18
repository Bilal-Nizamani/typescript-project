import "./css/style.css";
import FullList from "./model/FullList";
import ListItem from "./model/Lisitem";
import Template from "./template/template";

const initApp = (): void => {
  const fulllist = FullList.instance;
  const template = Template.instance;
  const itemEntryForm = document.getElementById(
    "itemEntryForm"
  ) as HTMLFormElement;
  itemEntryForm.addEventListener("submit", (event: SubmitEvent): void => {
    event.preventDefault();
    const input = document.getElementById("newItem") as HTMLInputElement;
    const newEntryTExt: string = input.value.trim();
    if (!newEntryTExt.length) return;
    const itemId: number = fulllist.list.length
      ? parseInt(fulllist.list[fulllist.list.length - 1].id) + 1
      : 1;
    const newItem = new ListItem(itemId.toString(), newEntryTExt);
    fulllist.addItem(newItem);
    template.render(fulllist);
    input.value = "";
  });

  const clearItems = document.getElementById(
    "clearItemsButton"
  ) as HTMLButtonElement;
  clearItems.addEventListener("click", (): void => {
    fulllist.clearList();
    template.clear();
  });
  fulllist.load();
  template.render(fulllist);
};

document.addEventListener("DOMContentLoaded", initApp);
