export type Message = string;

export type Group = { name: string; messages: Array<Message> };

export type State = {
  selected: Group | null;
  notepad: Array<Group>;
};
