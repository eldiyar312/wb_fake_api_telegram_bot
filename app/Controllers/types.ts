export type TBody = {
  update_id: number
  callback_query?: ICallbackQuery
  message?: IMessage
}

export interface ICallbackQuery {
  id: string
  from: IFrom
  message: ICallbackMessage
  chat_instance: string
  data: string
}

export interface IMessage {
  message_id: number
  from: IFrom
  chat: IChat
  date: number
  text: string
  entities: IEntity[]
}

interface IChat {
  id: number
  first_name: string
  username: string
  type: string
}

interface IEntity {
  offset: number
  length: number
  type: string
}

interface IFrom {
  id: number
  is_bot: boolean
  first_name: string
  username: string
  language_code: string
}

interface IFrom {
  id: number
  is_bot: boolean
  first_name: string
  username: string
  language_code: string
}

export interface ICallbackMessage {
  message_id: number
  from: IFrom
  chat: IChat
  date: number
  text: string
  reply_markup: IReplyMarkup
}

interface IReplyMarkup {
  inline_keyboard: Array<IInlineKeyboard[]>
}

interface IInlineKeyboard {
  text: string
  callback_data: string
}

export type TChatLastCommad = { [key: string]: string }
