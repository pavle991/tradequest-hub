import { type Message } from './message'

export type Deal = {
  id: string
  seller: string
  title: string
  date: string
  messages: Message[]
}