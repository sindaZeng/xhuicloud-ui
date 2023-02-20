import { HttpClient } from '@/utils/http'

export function getConversation() {
  return HttpClient.get<Message[]>({
    url: `/chat/conversation`
  })
}
