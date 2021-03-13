export const getId = () => Math.random().toString(26).slice(2);
export const saveToLocalStorage = (data: any) =>
  localStorage.setItem("notepad", JSON.stringify(data));
export const loadFromLocalStorage = () => {
  const data = localStorage.getItem("notepad");
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.log(e);
    }
  }
};
