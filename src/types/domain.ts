export type CallItem = {
  id: number
  name: string
  total: number
  remaining: number
  unit: string
  image: string
}

export type ContributionStatus = 'pending' | 'delivered' | 'not_delivered'

export type Contribution = {
  id: number
  callId: number
  memberName: string
  quantity: number
  status: ContributionStatus
}

export type StudyItem = {
  id: number
  title: string
  category: string
  type: 'Material geral' | 'Fundamento da casa'
  progress: number
  summary: string
  lessons: string[]
}

export type PointItem = {
  id: number
  title: string
  group: string
  source: string
  lyrics: string
  referenceUrl: string
}
